<moc-container flex>
            <moc-section class="project-search">
                <el-form :model="search" :inline="true" label-width="120px" label-suffix="：">
                    <el-form-item label="审批人">
                        <el-input v-model="groupId" clearable placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域">
                        <el-select
                            v-model="search.region"
                            placeholder="活动区域"
                            filterable
                            clearable
                        >
                            <el-option
                                v-for="(item, index) in options.region"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动区域">
                        <moc-all-select
                            v-model="search.region2"
                            :selectOptions="options.region"
                            filterable
                            clearable
                        >
                        </moc-all-select>
                    </el-form-item>
                    <el-form-item label="日期选择">
                        <el-date-picker
                            v-model="search.date"
                            placeholder="任意日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="时间段选择">
                        <el-date-picker
                            v-model="search.checkTime"
                            type="datetimerange"
                            value-format="yyyyMMddHHmmss"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            :default-time="['00:00:00', '23:59:59']"
                            :picker-options="$global.datePickerOptions"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="project-search-btns">
                        <el-button type="primary" @click="onSearch()">查询</el-button>
                    </el-form-item>
                </el-form>
            </moc-section>
            <moc-section id="project-dialog-table" bodier class="project-table">
                <!-- <template #header>
                    <p>class里面的project为项目名称</p>
                </template> -->
                <el-table
                    :data="tableData"
                    :height="tableHeight"
                    v-loading="tableLoading"
                    border
                    stripe
                >
                    <el-table-column label="序号" type="index" :index="handleIndex" :width="tableIndexWidth" align="center" class-name="neu-table-index"></el-table-column>
                    <el-table-column prop="date" label="日期" width="218" :formatter="dateFormatter"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="186"></el-table-column>
                    <el-table-column prop="address" label="地址" min-width="256"></el-table-column>
                </el-table>
                <!-- <template #footer>
                    <p style="padding: 6px;">class里面的project为项目名称</p>
                </template> -->
            </moc-section>
            <moc-section class="project-pagination">
                <el-pagination
                    :current-page.sync="pagination.current"
                    :page-size.sync="pagination.size"
                    @current-change="initTableData()"
                    @size-change="initTableData()"
                    :total="pagination.total"
                    :layout="$global.paginationLayout"
                    :page-sizes="$global.paginationSizes"
                    background
                >
                </el-pagination>
            </moc-section>
        </moc-container>
