var documenterSearchIndex = {"docs":
[{"location":"#MetaPhylo","page":"Home","title":"MetaPhylo","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: Stable) (Image: Dev) (Image: Build Status) (Image: Coverage)","category":"page"},{"location":"","page":"Home","title":"Home","text":"MetaPhylo.jl is Julia package for dealing with phylogenetic trees. This package is in the early stage of development and probably has many bugs (especially around Newick format). Bug reports and any suggestions are welcome🙂!","category":"page"},{"location":"#Acknowledgements","page":"Home","title":"Acknowledgements","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"MetaPhylo.jl is inspired by MetaGraphs.jl and implemented with Graphs.jl and AbstractTrees.jl.","category":"page"},{"location":"#Example","page":"Home","title":"Example","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"julia> import Pkg; Pkg.add(url=\"https://github.com/banhbio/MetaPhylo.jl\");\n\njulia> using MetaPhylo\n\njulia> tree = parse_newick(\"((A:0.1,B:0.2)100:0.3,((C:0.4, D:0.5)77:0.6,E:0.7)98:0.8,F:0.9);\", MetaPhylo.Tree{Int, UnRooted, ReRootable})\nMetaPhylo.Tree with 6 leaves.\n    Rooted: false\n    Rerootable: true\n\njulia> print_tree(tree)\n1: [root] \n├─ 2: [value:100.0, length:0.3] \n│  ├─ 3: [length:0.1] label:\"A\"\n│  └─ 4: [length:0.2] label:\"B\"\n├─ 5: [value:98.0, length:0.8] \n│  ├─ 6: [value:77.0, length:0.6] \n│  │  ├─ 7: [length:0.4] label:\"C\"\n│  │  └─ 8: [length:0.5] label:\" D\"\n│  └─ 9: [length:0.7] label:\"E\"\n└─ 10: [length:0.9] label:\"F\"\n\njulia> tree[3]\nDict{Symbol, Any} with 1 entry:\n  :label => \"A\"\n\njulia> tree[5,6]\nDict{Symbol, Any} with 2 entries:\n  :value  => 77.0\n  :length => 0.6\n\njulia> findnodes(tree, :label => isequal(\"A\"))\n1-element Vector{Int64}:\n 3\n\njulia> findbranches(tree, :value => x -> x ≥ 90)\n1-element Vector{Graphs.SimpleGraphs.SimpleEdge{Int64}}:\n Edge 1 => 2\n Edge 1 => 5\n\njulia> @time big_tree = Newick.File(\"/path/to/big_tree\") |> MetaPhylo.Tree{Int, UnRooted, ReRootable}\n  3.394991 seconds (23.63 M allocations: 1.180 GiB, 32.24% gc time)\nMetaPhylo.Tree with 54327 leaves.\n    Rooted: false\n    Rerootable: true\n\njulia> freeze(big_tree)\nMetaPhylo.StaticTree with 54327 leaves.\n    Rooted: false\n    branch_data: NamedTuple{(:length,), Tuple{Float64}}\n    node_data: NamedTuple{(), Tuple{}}","category":"page"},{"location":"man/api/","page":"API","title":"API","text":"CurrentModule = MetaPhylo","category":"page"},{"location":"man/api/#MetaPhylo","page":"API","title":"MetaPhylo","text":"","category":"section"},{"location":"man/api/","page":"API","title":"API","text":"Documentation for MetaPhylo.","category":"page"},{"location":"man/api/","page":"API","title":"API","text":"","category":"page"},{"location":"man/api/","page":"API","title":"API","text":"Modules = [MetaPhylo]","category":"page"},{"location":"man/api/#AbstractTrees.treebreadth-Tuple{MetaPhylo.AbstractPhyloTree}","page":"API","title":"AbstractTrees.treebreadth","text":"AbstractTrees.treebreadth(tree::AbstractPhyloTree)\n\nReturn the number of leaves in the tree.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#AbstractTrees.treeheight-Tuple{MetaPhylo.AbstractPhyloTree}","page":"API","title":"AbstractTrees.treeheight","text":"AbstractTrees.treeheight(tree::AbstractPhyloTree)\n\nReturn the maximum depth from the root to the leaves in the tree. See also treelength.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#AbstractTrees.treesize-Tuple{MetaPhylo.AbstractPhyloTree}","page":"API","title":"AbstractTrees.treesize","text":"AbstractTrees.treesize(tree::AbstractPhyloTree)\n\nReturn the size og the tree.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.add_child!-Tuple{MetaPhylo.Tree, Integer, Dict{Symbol, Any}, Dict{Symbol, Any}}","page":"API","title":"MetaPhylo.add_child!","text":"add_child!(tree::Tree, idx::Integer, branch_data::Dict{Symbol, Any}, node_data::Dict{Symbol, Any})\n\nAdd a child node to the specified node with branch and node data. Return true on success. \n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.ancestors-Union{Tuple{Code}, Tuple{MetaPhylo.AbstractPhyloTree{Code}, Integer}} where Code","page":"API","title":"MetaPhylo.ancestors","text":"ancestors(tree::AbstractPhyloTree, idx::Integer)\n\nReturn the indices of all ancestor nodes of the specified idx node.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.common_ancestor-Tuple{MetaPhylo.AbstractPhyloTree, Vararg{Integer}}","page":"API","title":"MetaPhylo.common_ancestor","text":"common_ancestor(tree::AbstractPhyloTree, idx1::Integer...)\n\nReturn the common ancestor index of two specified idx1 and idx2 nodes.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.distance-Tuple{MetaPhylo.AbstractPhyloTree, Integer, Integer}","page":"API","title":"MetaPhylo.distance","text":"distance(tree::AbstractPhyloTree, idx1::Integer, idx2::Integer)\n\nReturn distance between two nodes on a tree. \n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.distance_matrix-Tuple{MetaPhylo.AbstractPhyloTree}","page":"API","title":"MetaPhylo.distance_matrix","text":"distance_matrix(tree::AbstractPhyloTree)\n\nReturn pairwise distances between all leaves on the tree in a AxisArray.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.findbranches-Tuple{MetaPhylo.AbstractPhyloTree, Vararg{Pair{<:Union{Symbol, Vector{Symbol}}, <:Union{Function, Type}}}}","page":"API","title":"MetaPhylo.findbranches","text":"findbranches(tree::AbstractPhyloTree, args...; ifnot_haskey::Bool=false)\n\nReturn indices of tree branch which all values proceed by transformation(s) args for a given attribute are true.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.findnodes-Tuple{MetaPhylo.AbstractPhyloTree, Vararg{Pair{<:Union{Symbol, Vector{Symbol}}, <:Union{Function, Type}}}}","page":"API","title":"MetaPhylo.findnodes","text":"findnodes(tree::AbstractPhyloTree, args...; ifnot_haskey::Bool=false)\n\nReturn indices of tree node which all values proceed by transformation(s) args for a given attribute are true.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.freeze-Union{Tuple{MetaPhylo.Tree{Code, rooted}}, Tuple{rooted}, Tuple{Code}} where {Code, rooted}","page":"API","title":"MetaPhylo.freeze","text":"freeze(tree::MetaPhylo.Tree)\n\nGenerate a StaticTree from a tree. NamedTuple stores only the keys that are common to all data among the node and branch data of previous tree.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.isinternal-Tuple{MetaPhylo.AbstractPhyloTree, Graphs.SimpleGraphs.SimpleEdge}","page":"API","title":"MetaPhylo.isinternal","text":"isinternal(tree::AbstractPhyloTree, idx::Integer)\n\nReturn true if the edge is both connected to internal nodes of the tree.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.isinternal-Tuple{MetaPhylo.AbstractPhyloTree, Integer}","page":"API","title":"MetaPhylo.isinternal","text":"isinternal(tree::AbstractPhyloTree, idx::Integer)\n\nReturn true if the idx is contained in an internal node of the tree.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.isleaf-Tuple{MetaPhylo.AbstractPhyloTree, Graphs.SimpleGraphs.SimpleEdge}","page":"API","title":"MetaPhylo.isleaf","text":"isleaf(tree::AbstractPhyloTree, edge::Edge)\n\nReturn true if the edge is connected to a leaf node of the tree.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.isleaf-Tuple{MetaPhylo.AbstractPhyloTree, Integer}","page":"API","title":"MetaPhylo.isleaf","text":"isleaf(tree::AbstractPhyloTree, idx::Integer)\n\nReturn true if the idx is contained in a leaf node of the tree.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.isrerootable-Union{Tuple{Type{<:MetaPhylo.Tree{Code, rooted, ReRootable}}}, Tuple{rooted}, Tuple{Code}} where {Code, rooted}","page":"API","title":"MetaPhylo.isrerootable","text":"isrerootable(tree::AbstractPhyloTree)\n\nReturn true if tree is rerootable.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.isrooted-Union{Tuple{Type{<:MetaPhylo.AbstractPhyloTree{Code, Rooted}}}, Tuple{Code}} where Code","page":"API","title":"MetaPhylo.isrooted","text":"isrooted(tree::AbstractPhyloTree)\n\nReturn true if tree is rooted.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.ladderize!-Tuple{IndexNode{<:MetaPhylo.Tree, Int64}}","page":"API","title":"MetaPhylo.ladderize!","text":"ladderize!(tree::Tree; left=false)\n\nLadderize the tree structure. By default, the smallest clade is on the right side; if left=true, on the left side.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.leafedges-Union{Tuple{Code}, Tuple{MetaPhylo.AbstractPhyloTree{Code}, Integer}} where Code","page":"API","title":"MetaPhylo.leafedges","text":"leafedges(tree::AbstractPhyloTree, [idx::Integer])\n\nReturn the edges of all edges connected to the leaves in the tree. If the index is specified, this returns the edges connected to its leaves in the tree.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.leaves-Tuple{MetaPhylo.AbstractPhyloTree, Integer}","page":"API","title":"MetaPhylo.leaves","text":"leaves(tree::AbstractPhyloTree, [idx::Integer])\n\nReturn the indices of all leaves in the tree. If the index is specified, this returns the indices of leaves in its subtree.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.parent_branch-Union{Tuple{Code}, Tuple{MetaPhylo.AbstractPhyloTree{Code}, Integer}} where Code","page":"API","title":"MetaPhylo.parent_branch","text":"parent_branch(tree::AbstractPhyloTree, idx::Integer)\n\nReturn the baranch (edge) between the specified idx node and its parent node. If the node is root, this returns nothing \n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.reindex!-Union{Tuple{MetaPhylo.Tree{Code}}, Tuple{Code}} where Code","page":"API","title":"MetaPhylo.reindex!","text":"reindex!(tree::Tree)\n\nReindex the tree in PreOderDFS order from the root. \n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.rem_descendants!-Tuple{MetaPhylo.Tree, Integer}","page":"API","title":"MetaPhylo.rem_descendants!","text":"rem_descendants(tree::Tree, idx::Integer)\n\nRemove all descendants of the specified node. Return true on success. \n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.reroot!-Union{Tuple{root}, Tuple{Code}, Tuple{MetaPhylo.Tree{Code, root, NotReRootable}, Integer}} where {Code, root}","page":"API","title":"MetaPhylo.reroot!","text":"reroot!(tree::Tree, idx::Integer)\n\nReroot the tree at the specified node. Return true if rerooting success.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.swap!-Tuple{MetaPhylo.Tree, Integer, Pair{<:Integer, <:Integer}}","page":"API","title":"MetaPhylo.swap!","text":"swap!(tree::Tree, idx::Integer, old_new::Pair{<:Integer, <:Integer})\n\nSwap the two child elements of the specified idx node. The old and new in old_new must be child of idx node. Return ture if swapping fails; true otherwise.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.swapchildren!-Tuple{MetaPhylo.Tree, Integer, Vector{<:Integer}}","page":"API","title":"MetaPhylo.swapchildren!","text":"swapchildren!(tree::Tree, idx::Integer, newchildren)\n\nSwap the child indices of the specified idx node to the given newchildren. The elements of children and newchildren must be match. Return false if swapping fails; true otherwise.\n\n\n\n\n\n","category":"method"},{"location":"man/api/#MetaPhylo.treelength-Tuple{MetaPhylo.AbstractPhyloTree}","page":"API","title":"MetaPhylo.treelength","text":"treelength(tree::AbstractPhyloTree, [idx::Integer])\n\nReturn maximum distance from the root to the leaves in the tree. If the index is specified, this returns maximum distance from the specified idx to its leaves in the tree.\n\n\n\n\n\n","category":"method"},{"location":"man/tutorial/#Tutorial","page":"Tutorial","title":"Tutorial","text":"","category":"section"},{"location":"man/tutorial/#I/O","page":"Tutorial","title":"I/O","text":"","category":"section"},{"location":"man/tutorial/#Reading-trees","page":"Tutorial","title":"Reading trees","text":"","category":"section"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"#read a tree from a newick String\njulia> tree = parse_newick(\"((A:0.1,B:0.2)100:0.3,((C:0.4,D:0.5)77:0.6,E:0.7)98:0.8)100:1.2;\", MetaPhylo.Tree{Int, UnRooted, ReRootable})\nMetaPhylo.Tree with 5 leaves.\n    Rooted: false\n    Rerootable: true\n\n#read a tree from a newick file.\njulia> tree = Newick.File(\"/path/to/your_tree\") |> Tree{Int, Rooted, NotReRootable}\nMetaPhylo.Tree with 5 leaves.\n    Rooted: true\n    Rerootable: false","category":"page"},{"location":"man/tutorial/#Writing-trees","page":"Tutorial","title":"Writing trees","text":"","category":"section"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"MetaPhylo.jl does not yet support writing tree. Sorry!","category":"page"},{"location":"man/tutorial/#Understanding-MetaPhylo.Tree-data-types","page":"Tutorial","title":"Understanding MetaPhylo.Tree data types","text":"","category":"section"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"The tree structure can be viewed with print_tree function.","category":"page"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"julia> print_tree(tree)\n1: [root] \n├─ 2: [value:100.0, length:0.3] \n│  ├─ 3: [length:0.1] label:\"A\"\n│  └─ 4: [length:0.2] label:\"B\"\n├─ 5: [value:98.0, length:0.8] \n│  ├─ 6: [value:77.0, length:0.6] \n│  │  ├─ 7: [length:0.4] label:\"C\"\n│  │  └─ 8: [length:0.5] label:\"D\"\n│  └─ 9: [length:0.7] label:\"E\"\n└─ 10: [length:0.9] label:\"F\"","category":"page"},{"location":"man/tutorial/#Get-basic-informations-about-trees","page":"Tutorial","title":"Get basic informations about trees","text":"","category":"section"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"julia> treesize(tree)\n10\n\njulia> treebreadth(tree)\n6\n\njulia> treeheight(tree)\n3","category":"page"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"Information about a subtree can be obtained using the IndexNode type, which is available through the getindex function given the node's index and Colon (:).","category":"page"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"julia> print_tree(tree[5,:])\n5: [value:98.0, length:0.8] \n├─ 6: [value:77.0, length:0.6] \n│  ├─ 7: [length:0.4] label:\"C\"\n│  └─ 8: [length:0.5] label:\"D\"\n└─ 9: [length:0.7] label:\"E\"\n\njulia> treesize(tree[5,:])\n5\n\njulia> treebreadth(tree[5,:])\n3\n\njulia> treeheight(tree[5,:])\n2","category":"page"},{"location":"man/tutorial/#Nodes-and-branches-attributes","page":"Tutorial","title":"Nodes and branches attributes","text":"","category":"section"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"The attributes of each node and branch of the can be accessed with getindex. The attributes are stored in the Dicts.","category":"page"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"julia> tree[3]\nDict{Symbol, Any} with 1 entry:\n  :label => \"A\"\n\njulia> tree[5,6]\nDict{Symbol, Any} with 2 entries:\n  :value  => 77.0\n  :length => 0.6","category":"page"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"The attributes of each node and branch can be changed or added by using setindex!.","category":"page"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"julia> tree[2][:label] = \"AB\"\n\"AB\"\n\njulia> print_tree(tree)\n1: [root] \n├─ 2: [value:100.0, length:0.3] label:\"AB\"\n│  ├─ 3: [length:0.1] label:\"A\"\n│  └─ 4: [length:0.2] label:\"B\"\n├─ 5: [value:98.0, length:0.8] \n│  ├─ 6: [value:77.0, length:0.6] \n│  │  ├─ 7: [length:0.4] label:\"C\"\n│  │  └─ 8: [length:0.5] label:\"D\"\n│  └─ 9: [length:0.7] label:\"E\"\n└─ 10: [length:0.9] label:\"F\"","category":"page"},{"location":"man/tutorial/#Traversing-tree","page":"Tutorial","title":"Traversing tree","text":"","category":"section"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"Tree traversing can be done through the IndexNode type. IndexNode can be used as input for all iterators (PreOderDFS, PostOderDFS, Leaves etc...) provided by AbstractTrees.jl An IndexNode has a tree and its indexes internally. The index can be accessed through nodevalue or nodevalues functions. See AbstractTrees.jl for details.","category":"page"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"julia> [ idx for idx in nodevalues(PreOrderDFS(tree[:]))]\n8-element Vector{Int64}:\n 1\n 2\n 3\n 4\n 5\n 6\n 7\n 8\n\njulia> [ idx for idx in nodevalues(PostOrderDFS(tree[:]))]\n8-element Vector{Int64}:\n 3\n 4\n 2\n 6\n 7\n 5\n 8\n 1\n\njulia> [ tree[idx][:label] for idx in nodevalues(Leaves(tree[:]))]\n5-element Vector{String}:\n \"A\"\n \"B\"\n \"C\"\n \"D\"\n \"E\"\n","category":"page"},{"location":"man/tutorial/#Tree-structure-modification","page":"Tutorial","title":"Tree structure modification","text":"","category":"section"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"Tree structure modification can be done through bang(!) functions (reroot!, swap!, swapchildren! etc.). Modified tree can be re-indexed by reindex!.","category":"page"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"julia> ladderize!(tree)\ntrue\n\njulia> print_tree(tree)\n1: [root] \n├─ 8: [length:0.7] label:\"E\"\n├─ 2: [value:100.0, length:0.3] \n│  ├─ 3: [length:0.1] label:\"A\"\n│  └─ 4: [length:0.2] label:\"B\"\n└─ 5: [value:98.0, length:0.6] \n   ├─ 6: [length:0.4] label:\"C\"\n   └─ 7: [length:0.5] label:\"D\"\n\njulia> reindex!(tree)\ntrue\n\njulia> print_tree(tree)\n1: [root] \n├─ 2: [length:0.7] label:\"E\"\n├─ 3: [value:100.0, length:0.3] \n│  ├─ 4: [length:0.1] label:\"A\"\n│  └─ 5: [length:0.2] label:\"B\"\n└─ 6: [value:98.0, length:0.6] \n   ├─ 7: [length:0.4] label:\"C\"\n   └─ 8: [length:0.5] label:\"D\"\n","category":"page"},{"location":"man/tutorial/#Find-nodes-and-branches-by-their-attributes","page":"Tutorial","title":"Find nodes and branches by their attributes","text":"","category":"section"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"Nodes and branches that match the given criteria can be found with the findnodes and findbranches functions. These functions return the indices of the matched nodes and branches.","category":"page"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"julia> findnodes(tree, :label => isequal(\"A\"))\n1-element Vector{Int64}:\n 3\n\njulia> findbranches(tree, :value => x -> x ≥ 90)\n1-element Vector{Graphs.SimpleGraphs.SimpleEdge{Int64}}:\n Edge 1 => 2\n Edge 1 => 5","category":"page"},{"location":"man/tutorial/#StaticTree-(experimental)","page":"Tutorial","title":"StaticTree (experimental)","text":"","category":"section"},{"location":"man/tutorial/","page":"Tutorial","title":"Tutorial","text":"You can generate static version of MetaPhylo.Tree through freeze function. MetaPhylo.StaticTree has an StaticGraph internally (StaticGraphs.jl), and the properties of each node and branch are provided in NamedTuples. This allows for type stable access to node and edge properties.","category":"page"}]
}
