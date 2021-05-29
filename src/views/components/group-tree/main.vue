<template>
	<div class="moc-group-tree">
		<div class="moc-group-tree-header" v-if="showHeader">
			<p class="moc-group-tree-title">{{title}}</p>
			<div class="moc-group-tree-tools">
				<div v-if="appendRoot" @click="addGroupTree" class="moc-group-tree-add">
					<i class="el-icon-folder-add"></i>
				</div>
			</div>
		</div>
		<div class="moc-group-tree-bodier">
			<div class="moc-group-tree-search" v-if="search">
				<el-input v-model="filterGroupTreeNodeText" placeholder="搜索" suffix-icon="el-icon-search" clearable></el-input>
			</div>
			<div class="moc-group-tree-box">
				<el-tree
					:data="groupTree"
					:node-key="props.id"
					highlight-current
					:current-node-key="currentNodeKey"
					:filter-node-method="filterGroupTreeNode"
					:default-expanded-keys="defaultExpandedKeys"
					@node-click="nodeClick"
					:expand-on-click-node="false"
                    :props="props"
					ref="groupTree"
				>
					<div class="moc-group-tree-node" slot-scope="{ node, data }">
						<moc-tooltip
							:content="node.label"
							:refName="'id'+data[props.id]"
							placement="top-start"
							effect="light"
							popper-class="generalView"
							class="moc-group-tree-node-text"
						>
						</moc-tooltip>
						<a @click.stop="nodeContextmenu(node, data)" v-if="data[props.id] !== 'root' && nodeTools && !data.nodeTools" class="moc-group-tree-node-more" href="javascript:;"><i class="el-icon-more"></i></a>
						<div class="moc-group-tree-node-tools" v-if="data.tools">
							<span v-if="removeNode && !data.removeNode" @click.stop="removeGroupTreeNode(data)">删除</span>
							<span v-if="renameNode && !data.renameNode" @click.stop="renameGroupTreeNode(data)">重命名</span>
							<span v-if="appendChild && !data.appendChild" @click.stop="addGroupTreeNode(data)">添加子节点</span>
						</div>
					</div>
				</el-tree>
			</div>
		</div>
	</div>
</template>

<script>

/**
 * 如果只有一个根节点的时候，不可以重命名、删除则根节点id为'root'
 *
 * Events
 * tree-node-click   		节点点击回调
 * tree-node-deleted	 	节点删除后的回调
 * tree-node-rename	 		节点修改名称的回调
 * add-append-node 		    自定义添加子节点的回调
 * 方法
 * createdGroupTreeRoot 	创建一级节点 参数： obj 节点数据
 * createdGroupTreeNode		创建子节点 参数： obj 节点数据
 *
 */
export default {
	props:{
		groupTree:{		// 数据
            type: Array,
            default: () => []
        },
		showHeader: {	// 是否显示顶部栏
            type: Boolean,
            default: false
		},
		title: String,	// 标题
		nodeTools: {	// 是否显示节点工具栏
            type: Boolean,
            default: false
		},
		appendChild: {	// 是否可以添加子节点
            type: Boolean,
            default: true
		},
		removeNode: {	// 是否可以删除节点
            type: Boolean,
            default: true
		},
		renameNode: {	// 是否可以给节点重命名
            type: Boolean,
            default: true
		},
		search: {	// 是否可以搜索
            type: Boolean,
            default: false
		},
		appendRoot: {	// 是否可以添加根节点
            type: Boolean,
            default: false
		},
		defaultExpandedKeys:{	// 需要展开的节点
            type: Array,
            default: () => []
        },
		currentNodeKey:"",	// 默认选中的key
        props:{         //  树的属性，包括唯一标识，子节点名称等
            type: Object,
            default:() => {
                return {
                    'id':'id',
                    'label':'label',
                    'children':'children',
                };
            }
        },
	},
	data () {
		return {
			filterGroupTreeNodeText:"",
			currentKey: null,
			activeNode:{}
		}
	},
	created(){

	},
	mounted(){
		document.addEventListener('click',e=>{
			this.removeCurrent(this.groupTree);
		})

	},
	watch: {
		filterGroupTreeNodeText(val) {
			this.$refs.groupTree.filter(val);
		}
	},
	methods:{
		/**
		 * 节点的点击事件
		 */
		nodeClick(data, node, dom){
			this.currentKey = data[this.props.id];
			this.$emit('tree-node-click', data);
			this.removeCurrent(this.groupTree);
			this.$refs.groupTree.setCurrentKey(this.currentKey);
		},
		/**
		 * 搜索事件
		 */
		filterGroupTreeNode(value, data) {
			if (!value) return true;
			return data[this.props.label].indexOf(value) !== -1;
		},
	    /**
	     * 树节点的右键事件
	     */
	    nodeContextmenu(node, data){
			this.removeCurrent(this.groupTree, ()=>{
				this.$set(data, 'tools', true)
				this.$refs.groupTree.setCurrentKey(data[this.props.id]);
			});
	    },
	    /**
	     * 删除、重命名、添加子节点
	     */
	    removeGroupTreeNode(data){
			this.$confirm('此操作将永久删除, 是否继续?', '系统提示', {
				type: 'warning'
			}).then(() => {
				this.$emit('tree-node-deleted', data);
			}).catch(() => {});
		},
        removeTreeNode(data){
        	this.$refs.groupTree.remove(data);
        },
		// 节点重命名
	    renameGroupTreeNode(data){
			this.$refs.groupTree.setCurrentKey(this.currentKey);
	    	this.$prompt('你正在修改： <strong>'+ data[this.props.label] + '</strong>', '重命名',{
	    		dangerouslyUseHTMLString: true
	    	}).then(({ value }) => {
	    		if(value){
					this.$emit('tree-node-rename', data, value);
				}
	    	}).catch(() => {

	    	});
	    	this.removeCurrent(this.groupTree);
		},
        renameTreeNode(data, value){
        	data[this.props.label] = value
        },
		// 添加一级节点
		addGroupTree(){
			this.$prompt('你正在添加树的一级子节点', '添加节点').then(({ value }) => {
				if(value){
					let obj = {
						id: '',
						label: value,
						parentId: 0
					};
					if( this.groupTree.length === 1 && this.groupTree[0][this.props.id]=="root"){
						obj.parentId = "root"
					}
					this.$emit('add-append-node', obj);
				}
			}).catch(() => {
			});
		},
		createdGroupTreeRoot(obj){
			if(this.groupTree[0][this.props.id]=="root"){
				this.groupTree[0][this.props.children].push(obj)
			}else{
				this.groupTree.push(obj)
			}
		},
		// 添加子节点
		addGroupTreeNode(data){
			/**
			 * 设置默认选中
			 */
			this.$refs.groupTree.setCurrentKey(this.currentKey);
			/**
			 * 选中的节点
			 */
			this.activeNode = data;
			/**
			 * 添加子节点
			 */
			this.$prompt('你正在添加： <strong>'+ data[this.props.label] + '</strong> 的子节点', '添加节点',{
				dangerouslyUseHTMLString: true
			}).then(({ value }) => {
				if(value){
					let obj = {
						id: '',
						label: value,
						parentId: data[this.props.id]
					};
					this.$emit('add-append-node', obj);
				}
			}).catch(() => {
			});
			/**
			 * 清楚工具栏
			 */
			this.removeCurrent(this.groupTree);
		},
		createdGroupTreeNode(obj){
			this.$refs.groupTree.append(obj, this.activeNode);
            let key = this.activeNode[this.props.id]
			this.$refs.groupTree.store.nodesMap[key].expanded = true;
		},
	    /**
	     * 清楚所有的工具栏
	     */
	    removeCurrent(data, callBack){
	    	data.forEach(item=>{
				this.$set(item, 'tools', false)
	    		if(item[this.props.children] && item[this.props.children].length>0){
	    			this.removeCurrent(item[this.props.children])
	    		}
	    	})
	    	if( callBack ){
	    		callBack()
	    	}
	    }
	}
};
</script>
