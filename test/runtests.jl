using MetaPhylo
using MetaPhylo.AbstractTrees
using MetaPhylo.Graphs
using MetaPhylo.AxisArrays
using Test

#TODO: Think more
@testset "newick/newick.jl" begin
    function try_parse(tree, type)
        try
            parse_newick(tree, type)
            return true
        catch e
            return false
        end
    end

    newicks= [
        "((,),,);",
        "((A,B),C,D);",
        "((A,B)E,C,D)F;",
        "((:0.1,:0.2):0.3,:0.4,:0.5);",
        "((:0.1,:0.2):0.3,:0.4,:0.5):0.0;",
        "((A:0.1,B:0.2):0.3,C:0.4,D:0.5);",
        "((A:0.1,B:0.2)E:0.3,C:0.4,D:0.5);",
        "((A:0.1,B:0.2)100:0.3,C:0.4,D:0.5);",
        "(((one, two),three),(four, five), six);",
        "(((one:10, two:20):70,three:30):80,(four:40, five:50):90, six:60);",
        "(((one:10, two:20)seven:70,three:30)eight:80,(four:40, five:50)nine:90, six:60);",
        "(((one:10, two:20)80:70,three:30)90:80,(four:40, five:50)100:90, six:60);",
    ]

    err_newicks = [
#        "(((o ne:10, two:20):70,three:30):80,(four:40, five:50):90, six:60);", #TODO:Is it ok?
        "((((one:10, two:20):70,three:30):80,(four:40, five:50):90, six:60);",
        "((()one:10, two:20):70,three:30):80,(four:40, five:50):90, six:60);",
        "(((o:ne:10, two:20):70,three:30):80,(four:40, five:50):90, six:60);",
        "(((o(ne:10, two:20):70,three:30):80,(four:40, five:50):90, six:60);",
        "(((o)ne:10, two:20):70,three:30):80,(four:40, five:50):90, six:60);",
        "(((one:1 0, two:20):70,three:30):80,(four:40, five:50):90, six:60);",
        "(((one:10:100, two:20):70,three:30):80,(four:40, five:50):90, six:60);",
    ]

    for newick in newicks
        @test try_parse(newick, MetaPhylo.Tree{Int, UnRooted, ReRootable})
    end

    for newick in err_newicks
        @test !try_parse(newick, MetaPhylo.Tree{Int, UnRooted, ReRootable})
    end
end

@testset "indexing.jl" begin
    tree = parse_newick("(((,),(,)),(,),);", MetaPhylo.Tree{Int, UnRooted, ReRootable})
    freezed_tree = freeze(tree)

    for t in [tree, freezed_tree]
        @test AbstractTrees.childindices(t, 1) == [2,9,12]
        @test AbstractTrees.childindices(t, 4) == []
        @test isnothing(AbstractTrees.parentindex(t, 1))
        @test AbstractTrees.parentindex(t, 2) == 1
        @test isnothing(AbstractTrees.nextsiblingindex(t, 1))
        @test AbstractTrees.nextsiblingindex(t, 2) == 9
        @test isnothing(AbstractTrees.nextsiblingindex(t, 11))
        @test isnothing(AbstractTrees.prevsiblingindex(t, 2))
        @test AbstractTrees.prevsiblingindex(t, 11) == 10
        @test AbstractTrees.rootindex(t) == 1
    end
end

@testset "interfaces.jl" begin

    tree = parse_newick("((A:1.1,B:0.2)100:0.3,((C:0.4, D:1.5)77:0.6,E:0.7)98:0.8,F:0.9);", MetaPhylo.Tree{Int, UnRooted, ReRootable})
    freezed_tree = freeze(tree)

    @test tree[1] == Dict{Symbol, Any}()
    @test tree[3] == Dict{Symbol, Any}(:label => "A")
    @test tree[1,2] == tree[Edge(1,2)] == Dict{Symbol, Any}(:length => 0.3, :value => 100)
    @test tree[1,10] == tree[Edge(1,10)] == Dict{Symbol, Any}(:length => 0.9)

    for t in [tree, freezed_tree]
        @test t[:] == IndexNode(t)
        @test t[4, :] == IndexNode(t, eltype(t.graph)(4))

        @test haskey(t, 1)
        @test haskey(t, 7)
        @test !haskey(t, 99)
        @test haskey(t, Edge(1,2))
        @test haskey(t, 1, 2)
        @test !haskey(t, 1, 3)
        @test @inferred(Nothing, parent_branch(t, 2)) == Edge(1,2)
        @test @inferred(isnothing(parent_branch(t, 1)))

        @test @inferred(leaves(t)) == [3, 4, 7, 8, 9, 10]
        @test @inferred(leaves(t, 2)) == [3, 4]
        @test @inferred(leaves(t, 3)) == [3]
        @test @inferred(!isleaf(t, 1))
        @test @inferred(!isleaf(t, 99))
        @test @inferred(isinternal(t, 1))
        @test @inferred(!isinternal(t, 3))
        @test @inferred(!isinternal(t, 99))

        # Julia v1.6.7 can not infer type correctly, but v1.7.2 can.
        @test leafedges(t) == [Edge(2,3), Edge(2,4), Edge(6,7), Edge(6,8), Edge(5,9), Edge(1,10)]
        @test leafedges(t, 5) == [Edge(6,7), Edge(6,8), Edge(5,9)]
        @test !isleaf(t, Edge(1,2))
        @test !isleaf(t, Edge(99, 100))
        @test isinternal(t, Edge(1,2))
        @test !isinternal(t, Edge(2,3))
        @test !isinternal(t, Edge(99, 100))

        @test MetaPhylo.findpath(t, 1, 4) == [1, 2, 4]
        @test isnothing(MetaPhylo.findpath(t, 5, 4))
    
        @test @inferred(treesize(t)) == 10
        @test @inferred(treesize(t[2,:])) == 3
        @test @inferred(treebreadth(t)) == 6
        @test @inferred(treebreadth(t[2,:])) == 2
        @test @inferred(treebreadth(t[5,:])) == 3
        @test @inferred(treeheight(t)) == 3
        @test @inferred(treeheight(t[2,:])) == 1
        @test @inferred(treeheight(t[5,:])) == 2

        @test @inferred(ancestors(t, 4)) == [1, 2, 4]
        @test @inferred(common_ancestor(t, 8, 9)) == 5
    end

    tree[3] = Dict(:label =>"a")
    tree[1,2] = Dict(:length => 0.7, :value => 90)
    tree[Edge(1,10)] = Dict(:length => 1.9)
    @test tree[3] == Dict(:label => "a")
    @test tree[1,2] == Dict(:length => 0.7, :value => 90)
    @test tree[Edge(1,10)] == Dict(:length => 1.9)

    #TODO: Add function to validate tree
    t = copy(tree)
    @test_throws ErrorException @inferred(reroot!(t, 3))
    @test @inferred(reroot!(t, 2))

    t = copy(tree)
    @test @inferred(!swapchildren!(t, 99, [4, 1]))
    @test @inferred(!swapchildren!(t, 2, [4, 1]))
    @test @inferred(swapchildren!(t, 2, [4, 3]))
    @test AbstractTrees.childindices(t, 2) == [4, 3]

    t = copy(tree)
    @test @inferred(!swap!(t, 99, 1=>4))
    @test @inferred(!swap!(t, 2, 1=>4))
    @test @inferred(swap!(t, 2, 3=>4))
    @test AbstractTrees.childindices(t, 2) == [4, 3]

    t = copy(tree)
    @test @inferred(ladderize!(t))
    @test AbstractTrees.childindices(t, 1) == [10, 2, 5]
    @test @inferred(reindex!(t))
    @test AbstractTrees.childindices(t, 1) == [2, 3, 6]

    t = copy(tree)
    @test @inferred(ladderize!(t; left=true))
    @test AbstractTrees.childindices(t, 1) == [5, 2, 10]
end

@testset "distance.jl" begin

    tree = parse_newick("((A:0.1,B:0.2):0.3,((C:0.4, D:0.5):0.6,E:0.7):0.8,F:0.9);", MetaPhylo.Tree{Int, UnRooted, ReRootable})
    freezed_tree = freeze(tree)
    
    for t in [tree, freezed_tree]
        @test distance(t, 3, 4) ≈ 0.1 + 0.2
        @test distance(t, 3, 3) ≈ Float64(0)
        @test treelength(t) ≈ 0.8 + 0.6 + 0.5
        @test treelength(t, 2) ≈ 0.2 
        @test treelength(t, 3) ≈ Float64(0)
    end

    tree = Newick.parse_newick("((A:1,B:2):3,(C:4,D:5):6,E:7);", MetaPhylo.Tree{Int, UnRooted, ReRootable})
    freezed_tree = freeze(tree)

    for t in [tree, freezed_tree]
        @test distance_matrix(t) ≈ AxisArray(
                                       [0.0 3.0 14.0 15.0 11.0;
                                        3.0 0.0 15.0 16.0 12.0;
                                        14.0 15.0 0.0 9.0 17.0;
                                        15.0 16.0 9.0 0.0 18.0;
                                        11.0 12.0 17.0 18.0 0.0],
                                        Axis{:x}([3,4,6,7,8]),
                                        Axis{:y}([3,4,6,7,8])
                                       )
    end
end

@testset "show.jl" begin
    tree = parse_newick("((A:0.1,B:0.2)100:0.3,((C:0.4,D:0.5)77:0.6,E:0.7)98:0.8,F:0.9);", MetaPhylo.Tree{Int, UnRooted, ReRootable})
    freezed_tree = freeze(tree)

    @test sprint(show, tree) ==
        """
        MetaPhylo.Tree with 6 leaves.
            Rooted: false
            Rerootable: true"""

    @test AbstractTrees.repr_tree(tree) ==
        """
        1: [root] 
        ├─ 2: [value:100.0, length:0.3] 
        │  ├─ 3: [length:0.1] label:\"A\"
        │  └─ 4: [length:0.2] label:\"B\"
        ├─ 5: [value:98.0, length:0.8] 
        │  ├─ 6: [value:77.0, length:0.6] 
        │  │  ├─ 7: [length:0.4] label:\"C\"
        │  │  └─ 8: [length:0.5] label:\"D\"
        │  └─ 9: [length:0.7] label:\"E\"
        └─ 10: [length:0.9] label:\"F\"
        """

    @test sprint(show, freezed_tree) ==
        """
        MetaPhylo.StaticTree with 6 leaves.
            Rooted: false
            branch_data: NamedTuple{(:length,), Tuple{Float64}}
            node_data: NamedTuple{(), Tuple{}}"""

    @test AbstractTrees.repr_tree(freezed_tree) ==
        """
        1: [root] 
        ├─ 2: [length:0.3] 
        │  ├─ 3: [length:0.1] 
        │  └─ 4: [length:0.2] 
        ├─ 5: [length:0.8] 
        │  ├─ 6: [length:0.6] 
        │  │  ├─ 7: [length:0.4] 
        │  │  └─ 8: [length:0.5] 
        │  └─ 9: [length:0.7] 
        └─ 10: [length:0.9] 
        """
end

@testset "find.jl" begin
    tree = parse_newick("((A:0.1,B:0.2)100:0.3,((C:0.4,D:0.5)77:0.6,E:0.7)98:0.8,F:0.9);", MetaPhylo.Tree{Int, UnRooted, ReRootable})
        
    @test Set(findnodes(tree, :label => x -> x == "A")) == Set([3])
    @test Set(findnodes(tree, :label => x -> x == "Z")) == Set([]) 
    @test Set(findnodes(tree, :dummy => x -> x == "A")) == Set([])
    @test Set(findnodes(tree, :dummy => x -> x == "A"; ifnot_haskey = true)) == Set(1:nv(tree.graph)) 

    @test Set(findbranches(tree, :length => x -> x > 0.7)) == Set([Edge(1,5), Edge(1,10)])
    @test Set(findbranches(tree, :length => x -> x < 0)) == Set([]) 
    @test Set(findbranches(tree, :value => x -> x > 95)) == Set([Edge(1,2), Edge(1,5)])
    @test Set(findbranches(tree, :value => x -> x > 95; ifnot_haskey = true)) == Set([Edge(1,2), Edge(1,5), Edge(1,10), Edge(2,3), Edge(2,4), Edge(5,9), Edge(6,7), Edge(6,8)])
end