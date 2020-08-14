
<template>
    <div id="container" class="treeView">

    </div>
</template>

<script>
    import G6 from '@antv/g6';

    var data = {
        "id": "第一层级",
        "children": [
            {
                "id": "第二层级 001",
                "children": [
                    { "id": "Logistic regression" },
                    { "id": "Linear discriminant analysis" },
                    { "id": "Rules" },
                    { "id": "Decision trees" },
                    { "id": "Naive Bayes" },
                    { "id": "K nearest neighbor" },
                    { "id": "Probabilistic neural network" },
                    { "id": "Support vector machine" }
                ]
            },
            {
                "id": "第二层级 002",
                "children": [
                    {
                        "id": "第三层级 001",
                        "children": [
                            { "id": "Different initializations" },
                            { "id": "Different parameter choices" },
                            { "id": "Different architectures" },
                            { "id": "Different modeling methods" },
                            { "id": "Different training sets" },
                            { "id": "Different feature sets" }
                        ]
                    },
                    {
                        "id": "第三层级 002",
                        "children": [
                            { "id": "Classifier selection" },
                            { "id": "Classifier fusion" }
                        ]
                    },
                    {
                        "id": "第三层级 003",
                        "children": [
                            { "id": "Bagging" },
                            { "id": "Boosting" },
                            { "id": "AdaBoost" }
                        ]
                    }
                ]
            },
            {
                "id": "第二层级 003",
                "children": [
                    { "id": "Multiple linear regression" },
                    { "id": "Partial least squares" },
                    { "id": "Multi-layer feedforward neural network" },
                    { "id": "General regression neural network" },
                    { "id": "Support vector regression" }
                ]
            }
        ]
    }

    export default {
        
        mounted () {
            this.$nextTick(() => {

            // fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
            // .then(res => res.json())
            // .then(data => {
                const width = document.getElementById('container').scrollWidth;
                const height = document.getElementById('container').scrollHeight || 500;
                const graph = new G6.TreeGraph({
                container: 'container',
                width,
                height,
                linkCenter: true,
                modes: {
                    default: [
                    {
                        type: 'collapse-expand',
                        onChange: function onChange(item, collapsed) {
                        const data = item.get('model').data;
                        data.collapsed = collapsed;
                        return true;
                        },
                    },
                    'drag-canvas',
                    'zoom-canvas',
                    ],
                },
                defaultNode: {
                    size: 26,
                    anchorPoints: [
                    [0, 0.5],
                    [1, 0.5],
                    ],
                    style: {
                    fill: '#C6E5FF',
                    stroke: '#5B8FF9',
                    },
                },
                defaultEdge: {
                    type: 'cubic-vertical',
                    style: {
                    stroke: '#A3B1BF',
                    },
                },
                layout: {
                    type: 'dendrogram',
                    direction: 'TB', // H / V / LR / RL / TB / BT
                    nodeSep: 40,
                    rankSep: 100,
                },
                });

                graph.node(function(node) {
                let position = 'right';
                let rotate = 0;
                if (!node.children) {
                    position = 'bottom';
                    rotate = Math.PI / 2;
                }
                return {
                    label: node.id,
                    labelCfg: {
                    position,
                    offset: 5,
                    style: {
                        rotate,
                        textAlign: 'start',
                    },
                    },
                };
                });

                graph.data(data);
                graph.render();
                graph.fitView();
            });

            // });
        },
    }
</script>

<style lang="scss" scoped>
.treeView {
    width: 100%;
    height:100%;
}
</style>