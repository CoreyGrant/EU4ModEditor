<template>
    <div class="datatable">
        <table>
            <thead>
                <tr>
                <th v-for="column in columns" :key="column.title" @click="sortColumnClick(column)">
                    <p :class="{'p100': sortColumn != column.title}">
                        {{column.title}}
                        <i class="fa fa-chevron-down" v-if="sortColumn == column.title && !sortAsc"></i>
                        <i class="fa fa-chevron-up"  v-if="sortColumn == column.title && sortAsc"></i>
                    </p>
                   
                </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(result, index) in pagedResults" :key="index">
                    <td v-for="column in columns" :key="column.title + index">
                        <p v-if="!column.link">{{displayColumn(column, result)}}</p>
                        <router-link :to="column.link(result)" v-if="column.link">{{displayColumn(column, result)}}</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="datatable-paging" v-if="pageSize">
            <div class="datatable-paging-prev" @click="prevPage()" :disabled="!canPagePrev"><i class="fa fa-chevron-left"></i></div>
            <div>{{pageStartIndex + 1}} to {{pageEndIndex + 1}} of {{data.length}}</div>
            <div class="datatable-paging-next" @click="nextPage()" :disabled="!canPageNext"><i class="fa fa-chevron-right"></i></div>
        </div>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: "Datatable",
		components: {
		},
		data(): any {
			return {
                pageIndex: 0,
                sortColumn: '',
                sortAsc: false,
			};
		},
		mounted() {
            this.sortColumn = this.sort;
		},
		props: {
            columns: Array, //{title, sort, filter, display, link}
            data: Array,
            pageSize: Number,
            sort: String,
		},
		methods: {
            sortData(data: any[]): any[]{
                var results = [...data];
                if(!this.sortColumn || !this.sortColumn.length){
                    return results;
                }
                for(var i = 0; i < this.columns.length; i++){
                    var column = this.columns[i];
                    if(column.title == this.sortColumn){
                        if(column.sort){
                            return results.sort((x: any, y: any) => !this.sortAsc
                                ? (column.sort(x) > column.sort(y) ? 1 : -1)
                                : (column.sort(x) > column.sort(y) ? -1 : 1));
                        }
                        return results.sort((x: any, y: any) => !this.sortAsc
                            ? (column.display(x) > column.display(y) ? 1 : -1)
                            : (column.display(x) > column.display(y) ? -1 : 1));
                    }
                }
                return results;
            },
            sortColumnClick(column: any): void{
                if(this.sortColumn == column.title){
                    this.sortAsc = !this.sortAsc;
                } else{
                    this.sortColumn = column.title;
                    this.sortAsc = false;
                }
            },
            nextPage(){
                if(this.canPageNext){
                    this.pageIndex++;
                }
            },
            prevPage(){
                if(this.canPagePrev){
                    this.pageIndex--;
                }
            },
            displayColumn(column: any, value: any){
                return column.display(value);
            }
		},
        computed:{
            canPageNext(): boolean{
                return this.pageEndIndex != this.data.length;
            },
            canPagePrev(): boolean{
                return this.pageStartIndex;
            },
            pagedResults(): []{
                return this.sortData(this.data).slice(this.pageStartIndex, this.pageEndIndex + 1);
            },
            pageStartIndex(): number{
                return this.pageSize ? this.pageSize * this.pageIndex : 0;
            },
            pageEndIndex(): number{
                return this.pageSize 
                    ? Math.min((this.pageSize * (this.pageIndex + 1)) - 1, this.data.length - 1) 
                    : this.data.length;
            }
        }
	});
</script>

<style lang="scss">
.datatable{
    width: 100%;
    height: 100%;
    .datatable-paging{
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
    }
    table{
        width: 100%;
        i{
            font-size: 10px;
        }
        thead{
            tr{
                border-bottom: 4px double rgb(165, 121, 66);
                th, td{
                    padding: 3px;
                }
            }
        }
        tbody{
            
            tr{
                &:not(:last-child){
                    border-bottom: 4px double rgb(165, 121, 66);
                }
                th, td{
                    padding: 3px; 
                }
            }
        }

    }
}
</style>
