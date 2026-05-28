#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TikTok跨境电商90天学习计划Excel生成器
"""

import openpyxl
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, Border, Side, PatternFill, Protection
from openpyxl.utils import get_column_letter
from openpyxl.formatting.rule import DataBarRule, ColorScaleRule
from openpyxl.chart import BarChart, Reference
import datetime

# 创建工作簿
wb = Workbook()

# 定义样式
header_font = Font(name='微软雅黑', size=12, bold=True, color='FFFFFF')
header_fill = PatternFill(start_color='4472C4', end_color='4472C4', fill_type='solid')
title_font = Font(name='微软雅黑', size=14, bold=True)
normal_font = Font(name='微软雅黑', size=10)
thin_border = Border(
    left=Side(style='thin'),
    right=Side(style='thin'),
    top=Side(style='thin'),
    bottom=Side(style='thin')
)

# 完成状态填充色
complete_fill = PatternFill(start_color='C6EFCE', end_color='C6EFCE', fill_type='solid')
in_progress_fill = PatternFill(start_color='FFEB9C', end_color='FFEB9C', fill_type='solid')
pending_fill = PatternFill(start_color='FFC7CE', end_color='FFC7CE', fill_type='solid')

# ==================== 工作表1：每日任务清单 ====================
ws1 = wb.active
ws1.title = "每日任务清单"

# 添加标题
ws1.merge_cells('A1:L1')
ws1['A1'] = '📅 TikTok跨境电商90天学习计划 - 每日任务清单'
ws1['A1'].font = Font(name='微软雅黑', size=16, bold=True, color='4472C4')
ws1['A1'].alignment = Alignment(horizontal='center', vertical='center')
ws1.row_dimensions[1].height = 35

# 添加说明行
ws1.merge_cells('A2:L2')
ws1['A2'] = '说明：每天按照任务清单执行，完成后填写"完成状态"和"备注"，坚持90天达到2年运营水平！'
ws1['A2'].font = Font(name='微软雅黑', size=10, italic=True)
ws1['A2'].alignment = Alignment(horizontal='center')

# 表头
headers = ['日期', '星期', '阶段', '周次', '任务类型', '具体任务', '量化指标', '目标值', '实际值', '完成状态', '自我评分(1-10)', '备注']
for col, header in enumerate(headers, 1):
    cell = ws1.cell(row=4, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
    cell.border = thin_border

ws1.row_dimensions[4].height = 30

# 生成90天任务数据
tasks_data = []
week_tasks = {
    1: [('平台入门', '注册TikTok店铺', '完成店铺注册', 1),
        ('平台入门', '设置店铺基础信息', '店铺信息完整度', 100),
        ('选品找货', '搜索头巾防滑夹产品', '收藏产品数', 30),
        ('选品找货', '联系供应商询价', '联系供应商数', 10),
        ('上架优化', '学习Listing优化', '掌握知识点数', 10),
        ('内容创作', '拍摄第一条视频', '视频条数', 1),
        ('数据分析', '查看店铺后台数据', '熟悉功能数', 5)],
    2: [('选品找货', '购买样品测试', '购买样品数', 5),
        ('上架优化', '上架5款产品', '上架产品数', 5),
        ('上架优化', '优化产品主图', '完成主图数', 5),
        ('上架优化', '撰写产品描述', '完成描述数', 5),
        ('内容创作', '发布3条视频', '发布视频数', 3),
        ('内容创作', '学习剪映基础', '掌握功能数', 10),
        ('数据分析', '分析竞品数据', '分析竞品数', 5)],
    3: [('上架优化', '上架5款产品', '上架产品数', 5),
        ('内容创作', '发布5条视频', '发布视频数', 5),
        ('内容创作', '学习视频拍摄技巧', '掌握技巧数', 8),
        ('数据分析', '查看店铺数据日报', '查看天数', 7),
        ('选品找货', '确定主推产品', '确定款数', 3),
        ('达人合作', '了解达人合作模式', '了解模式数', 3),
        ('私域运营', '注册WhatsApp Business', '完成注册', 1)],
    4: [('数据分析', '完成数据分析报告', '报告完成度', 100),
        ('广告投放', '学习TikTok广告基础', '掌握知识点', 15),
        ('广告投放', '创建第一个广告', '广告数', 1),
        ('内容创作', '发布7条视频', '发布视频数', 7),
        ('达人合作', '搜索潜在达人', '找到达人', 20),
        ('达人合作', '发送合作邀请', '发送邀请数', 10),
        ('周复盘', '第1月复盘总结', '总结完成度', 100)],
    5: [('数据分析', '分析广告数据', '分析广告数', 3),
        ('数据分析', '制定优化方案', '方案完整性', 100),
        ('广告投放', '优化广告定向', '优化次数', 3),
        ('广告投放', '测试不同素材', '测试素材数', 5),
        ('内容创作', '发布5条视频', '发布视频数', 5),
        ('达人合作', '跟进达人回复', '跟进次数', 10),
        ('私域运营', '添加客户到私域', '添加客户数', 50)],
    6: [('广告投放', '创建3个广告计划', '广告计划数', 3),
        ('广告投放', '分析ROI数据', '分析准确性', 90),
        ('广告优化', '优化广告效果', '优化后ROI', 1.5),
        ('内容创作', '发布5条视频', '发布视频数', 5),
        ('达人合作', '与达人建立合作', '合作成功数', 3),
        ('达人合作', '寄样给达人', '寄样品数', 5),
        ('数据分析', '查看店铺周数据', '查看次数', 7)],
    7: [('达人合作', '跟踪达人内容发布', '跟踪次数', 5),
        ('达人合作', '分析带货数据', '分析报告数', 3),
        ('内容创作', '发布5条视频', '发布视频数', 5),
        ('爆款打造', '分析爆款特征', '分析款数', 10),
        ('数据分析', '完成数据分析报告', '报告完成度', 100),
        ('私域运营', '发布促销信息', '发布次数', 2),
        ('周复盘', '第7周复盘', '总结完成度', 100)],
    8: [('爆款打造', '制定爆款打造方案', '方案完整性', 100),
        ('供应链优化', '批量采购谈判', '谈判次数', 5),
        ('供应链优化', '优化物流方案', '物流成本降低', 10),
        ('内容创作', '发布5条视频', '发布视频数', 5),
        ('广告投放', '加大爆款广告投入', '广告计划数', 3),
        ('达人合作', '拓展新达人', '达人新增数', 10),
        ('私域运营', '添加客户到私域', '添加客户数', 100)],
    9: [('爆款打造', '爆款开始起量', '爆款订单数', 100),
        ('爆款打造', '维护爆款', '维护措施数', 5),
        ('内容创作', '发布7条视频', '发布视频数', 7),
        ('供应链优化', '确认爆款备货', '备货数量', 500),
        ('数据分析', '分析爆款数据', '分析报告数', 4),
        ('私域运营', '收集用户反馈', '收集反馈数', 50),
        ('周复盘', '第9周复盘', '总结完成度', 100)],
    10: [('规模化运营', '多产品矩阵规划', '规划产品数', 10),
         ('内容创作', '发布5条视频', '发布视频数', 5),
         ('达人合作', '与更多达人合作', '新增合作数', 5),
         ('私域运营', '推出会员计划', '计划完整性', 100),
         ('财务管理', '学习成本利润计算', '掌握公式数', 10),
         ('数据分析', '完成数据分析报告', '报告完成度', 100),
         ('周复盘', '第2月复盘总结', '总结完成度', 100)],
    11: [('规模化运营', '多账号运营学习', '掌握平台数', 2),
         ('内容创作', '发布7条视频', '发布视频数', 7),
         ('爆款复制', '复制爆款到新产品', '复制款数', 3),
         ('私域运营', '复购引导', '复购率提升', 20),
         ('供应链优化', '找马来本地仓', '仓库数', 3),
         ('数据分析', '查看店铺数据', '查看天数', 7),
         ('风险控制', '学习风险控制', '风险点数', 10)],
    12: [('规模化运营', '制定规模化方案', '方案完整性', 100),
         ('内容创作', '发布7条视频', '发布视频数', 7),
         ('财务管理', '制作财务收支表', '表格完成度', 100),
         ('数据分析', '完成月度数据复盘', '复盘完成度', 100),
         ('达人合作', '评估达人ROI', '评估达人', 10),
         ('私域运营', '私域GMV占比', '占比目标', 20),
         ('周复盘', '第3月/总复盘', '总结完成度', 100)],
    13: [('持续优化', '优化店铺运营', '优化措施数', 10),
         ('内容创作', '发布7条视频', '发布视频数', 7),
         ('数据分析', '分析月度数据', '分析准确性', 95),
         ('达人合作', '维护达人关系', '维护次数', 10),
         ('私域运营', '提升私域服务', '服务优化数', 5),
         ('团队协作', '学习团队分工', '分工明确度', 100),
         ('周复盘', '第13周复盘', '总结完成度', 100)],
    14: [('未来规划', '制定下季度目标', '目标完整性', 100),
         ('持续优化', '优化全流程', '优化点数', 15),
         ('内容创作', '发布7条视频', '发布视频数', 7),
         ('数据分析', '完成最终数据报告', '报告完整度', 100),
         ('财务管理', '计算3月盈利', '盈利金额', 3000),
         ('能力验证', '验证2年运营水平', '能力达成率', 100),
         ('学习总结', '90天学习总结', '总结完整性', 100)]
}

day_count = 0
for week in range(1, 15):
    tasks = week_tasks.get(week, [])
    for task in tasks:
        if day_count >= 90:
            break
        
        stage = ''
        if week <= 4:
            stage = '第1阶段：入门'
        elif week <= 8:
            stage = '第2阶段：成长'
        elif week <= 12:
            stage = '第3阶段：精通'
        else:
            stage = '第4阶段：收尾'
        
        start_date = datetime.date(2024, 1, 1)
        current_date = start_date + datetime.timedelta(days=day_count)
        weekday = ['一', '二', '三', '四', '五', '六', '日'][current_date.weekday()]
        
        row_data = [
            current_date.strftime('%Y-%m-%d'),
            f'周{week}/星期{weekday}',
            stage,
            f'第{week}周',
            task[0],
            task[1],
            task[2],
            task[3],
            '',
            '未开始',
            '',
            ''
        ]
        
        row_num = 5 + day_count
        for col, value in enumerate(row_data, 1):
            cell = ws1.cell(row=row_num, column=col, value=value)
            cell.font = normal_font
            cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
            cell.border = thin_border
            
            if col == 10:  # 完成状态列
                cell.fill = pending_fill
        
        day_count += 1

# 设置列宽
column_widths = [12, 12, 15, 10, 12, 25, 15, 10, 10, 10, 12, 20]
for i, width in enumerate(column_widths, 1):
    ws1.column_dimensions[get_column_letter(i)].width = width

# ==================== 工作表2：周目标追踪 ====================
ws2 = wb.create_sheet("周目标追踪")

ws2.merge_cells('A1:I1')
ws2['A1'] = '📊 周目标追踪表'
ws2['A1'].font = Font(name='微软雅黑', size=16, bold=True, color='4472C4')
ws2['A1'].alignment = Alignment(horizontal='center', vertical='center')
ws2.row_dimensions[1].height = 35

headers2 = ['周次', '阶段', '周主题', '核心技能', '交付物', '视频目标', '产品目标', 'GMV目标($)', '完成状态']
for col, header in enumerate(headers2, 1):
    cell = ws2.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

week_summary = [
    ('第1周', '入门期', '平台认知与账号搭建', '店铺注册、信息设置', '开通店铺', 5, 5, 0, '未完成'),
    ('第2周', '入门期', '选品基础与1688找货', '选品理论、1688实操', '10款产品', 5, 10, 0, '未完成'),
    ('第3周', '入门期', '产品上架与Listing优化', '上架、标题、图片', '10个Listing', 7, 15, 50, '未完成'),
    ('第4周', '入门期', '内容创作入门', '拍摄、剪辑、发布', '10条视频', 10, 20, 100, '未完成'),
    ('第5周', '成长期', '数据分析与店铺优化', '数据看板、优化策略', '数据报告', 7, 25, 200, '未完成'),
    ('第6周', '成长期', '数据分析与A/B测试', '测试、优化', '优化方案', 7, 30, 300, '未完成'),
    ('第7周', '成长期', '广告投放入门', '千川广告、投放后台', '3个广告', 7, 35, 500, '未完成'),
    ('第8周', '成长期', '广告投放优化', '素材测试、定向优化', '优化记录', 7, 40, 800, '未完成'),
    ('第9周', '精通期', '达人合作与带货', '建联、寄样、合作', '5个合作', 7, 45, 1000, '未完成'),
    ('第10周', '精通期', '达人管理与数据追踪', '数据追踪、佣金结算', '数据报告', 7, 50, 1500, '未完成'),
    ('第11周', '精通期', '爆款打造与规模化', '爆款特征、选品', '1-2个爆款', 7, 55, 2000, '未完成'),
    ('第12周', '精通期', '供应链优化与备货', '批量采购、物流', '月销$3000', 7, 60, 3000, '未完成'),
    ('第13周', '收尾期', '私域运营与复购', '私域搭建、会员', '500+客户', 7, 65, 3500, '未完成'),
    ('第14周', '收尾期', '复盘总结与规划', '财务、数据、规划', '运营报告', 7, 70, 4000, '未完成'),
]

for row_num, data in enumerate(week_summary, 4):
    for col, value in enumerate(data, 1):
        cell = ws2.cell(row=row_num, column=col, value=value)
        cell.font = normal_font
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border
        
        if col == 9:
            cell.fill = pending_fill

# 设置列宽
column_widths2 = [10, 12, 20, 25, 15, 12, 12, 15, 12]
for i, width in enumerate(column_widths2, 1):
    ws2.column_dimensions[get_column_letter(i)].width = width

# ==================== 工作表3：月度目标 ====================
ws3 = wb.create_sheet("月度目标")

ws3.merge_cells('A1:H1')
ws3['A1'] = '🎯 月度目标与里程碑'
ws3['A1'].font = Font(name='微软雅黑', size=16, bold=True, color='4472C4')
ws3['A1'].alignment = Alignment(horizontal='center', vertical='center')
ws3.row_dimensions[1].height = 35

headers3 = ['月份', '阶段', '核心目标', '视频发布', '产品上架', 'GMV目标', '净利润目标', '完成度']
for col, header in enumerate(headers3, 1):
    cell = ws3.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

monthly_goals = [
    ('第1月', '入门期', '掌握平台基础，能独立上架和发布内容', 20, 30, '$200-500', '$0-100', 0),
    ('第2月', '成长期', '掌握数据分析和广告投放，能开始盈利', 40, 50, '$1500-2500', '$300-600', 0),
    ('第3月', '精通期', '独立运营店铺，爆款打造，月销$3000+', 60, 80, '$3000-5000', '$900-1500', 0),
]

for row_num, data in enumerate(monthly_goals, 4):
    for col, value in enumerate(data, 1):
        cell = ws3.cell(row=row_num, column=col, value=value)
        cell.font = normal_font
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border
        
        if col == 8:
            cell.fill = pending_fill

# 设置列宽
column_widths3 = [10, 12, 30, 15, 15, 15, 15, 12]
for i, width in enumerate(column_widths3, 1):
    ws3.column_dimensions[get_column_letter(i)].width = width

# ==================== 工作表4：AI工具清单 ====================
ws4 = wb.create_sheet("AI工具清单")

ws4.merge_cells('A1:G1')
ws4['A1'] = '🤖 AI工具必学清单'
ws4['A1'].font = Font(name='微软雅黑', size=16, bold=True, color='4472C4')
ws4['A1'].alignment = Alignment(horizontal='center', vertical='center')
ws4.row_dimensions[1].height = 35

headers4 = ['工具名称', '类型', '主要用途', '使用频率', '成本', '学习优先级', '掌握度']
for col, header in enumerate(headers4, 1):
    cell = ws4.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

ai_tools = [
    ('ChatGPT / Claude', 'AI对话', '文案、脚本、分析、问答、选品', '每天', '免费/$20月', '⭐⭐⭐⭐⭐', 0),
    ('剪映', '视频剪辑', '剪辑、AI字幕、AI配音、特效', '每天', '免费', '⭐⭐⭐⭐⭐', 0),
    ('Canva', '设计工具', '主图、海报、封面、logo设计', '每天', '免费/$300年', '⭐⭐⭐⭐⭐', 0),
    ('Notion AI', '笔记管理', '学习笔记、任务管理、计划追踪', '每天', '免费', '⭐⭐⭐⭐', 0),
    ('1688', '采购平台', '找货、供应商、拿样、比价', '每天', '免费', '⭐⭐⭐⭐⭐', 0),
    ('Midjourney', 'AI绘图', '生成产品图、场景图、广告素材', '每周3次', '$30月', '⭐⭐⭐', 0),
    ('ElevenLabs', 'AI配音', '多语言配音、马来英语配音', '每周2次', '免费试用', '⭐⭐⭐', 0),
    ('TikTok Ads', '广告投放', '千川广告、定向、投放优化', '每天', '消耗额', '⭐⭐⭐⭐', 0),
    ('TikBuddy', '数据分析', '竞品分析、广告素材、趋势追踪', '每周3次', '$30月', '⭐⭐⭐', 0),
    ('店小秘', 'ERP工具', '订单管理、批量上架、库存管理', '每天', '免费/$30月', '⭐⭐⭐⭐', 0),
    ('WhatsApp Business', '私域工具', '客户管理、群发、自动回复', '每天', '免费', '⭐⭐⭐⭐', 0),
    ('ManyChat', '私域自动化', '自动回复机器人、流程自动化', '每周', '$15月', '⭐⭐', 0),
    ('Keepa', '市场调研', '竞品价格追踪、销量预测', '每周2次', '$30月', '⭐⭐⭐', 0),
    ('Excel/Sheets + AI', '数据分析', '财务计算、数据整理、图表', '每天', '免费', '⭐⭐⭐⭐', 0),
]

for row_num, data in enumerate(ai_tools, 4):
    for col, value in enumerate(data, 1):
        cell = ws4.cell(row=row_num, column=col, value=value)
        cell.font = normal_font
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border

# 设置列宽
column_widths4 = [18, 12, 30, 12, 12, 12, 10]
for i, width in enumerate(column_widths4, 1):
    ws4.column_dimensions[get_column_letter(i)].width = width

# ==================== 工作表5：每日任务模板 ====================
ws5 = wb.create_sheet("每日任务模板")

ws5.merge_cells('A1:E1')
ws5['A1'] = '📝 每日任务执行模板'
ws5['A1'].font = Font(name='微软雅黑', size=16, bold=True, color='4472C4')
ws5['A1'].alignment = Alignment(horizontal='center', vertical='center')

# 固定任务
fixed_tasks = [
    ('必做任务', '发布1条视频', '拍摄+剪辑+发布', '1条', ''),
    ('必做任务', '回复评论', '全部回复，引导互动', '100%回复', ''),
    ('必做任务', '查看数据', '曝光、点击、转化', '记录数据', ''),
    ('必做任务', 'ChatGPT学习', '学习新知识/解决问题', '30分钟', ''),
    ('选做任务', '联系达人', '发送合作邀请', '5个', ''),
    ('选做任务', '优化Listing', '标题/图片/描述', '2款', ''),
    ('选做任务', '私域运营', '发布促销/添加客户', '20个', ''),
    ('选做任务', '广告投放', '查看广告/优化定向', '调整1次', ''),
]

headers5 = ['任务类型', '任务名称', '执行要点', '量化指标', '完成情况']
for col, header in enumerate(headers5, 1):
    cell = ws5.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

for row_num, data in enumerate(fixed_tasks, 4):
    for col, value in enumerate(data, 1):
        cell = ws5.cell(row=row_num, column=col, value=value)
        cell.font = normal_font
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border

# 设置列宽
column_widths5 = [12, 18, 30, 15, 15]
for i, width in enumerate(column_widths5, 1):
    ws5.column_dimensions[get_column_letter(i)].width = width

# ==================== 工作表6：技能验证清单 ====================
ws6 = wb.create_sheet("技能验证清单")

ws6.merge_cells('A1:F1')
ws6['A1'] = '✅ 90天后技能验证清单'
ws6['A1'].font = Font(name='微软雅黑', size=16, bold=True, color='4472C4')
ws6['A1'].alignment = Alignment(horizontal='center', vertical='center')

headers6 = ['技能分类', '具体技能', '要求水平', '当前水平', '差距', '行动计划']
for col, header in enumerate(headers6, 1):
    cell = ws6.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

skills_checklist = [
    ('店铺运营', '店铺搭建与设置', '精通', 0, '', ''),
    ('店铺运营', '店铺政策理解', '精通', 0, '', ''),
    ('选品能力', '1688选品技巧', '精通', 0, '', ''),
    ('选品能力', '竞品分析方法', '精通', 0, '', ''),
    ('选品能力', '利润计算模型', '精通', 0, '', ''),
    ('上架技能', 'Listing优化', '精通', 0, '', ''),
    ('上架技能', '主图视频制作', '熟练', 0, '', ''),
    ('内容创作', '短视频拍摄', '熟练', 0, '', ''),
    ('内容创作', '剪映剪辑', '精通', 0, '', ''),
    ('内容创作', 'TikTok算法理解', '熟练', 0, '', ''),
    ('数据分析', '后台数据查看', '精通', 0, '', ''),
    ('数据分析', '数据异常排查', '熟练', 0, '', ''),
    ('数据分析', 'A/B测试方法', '熟练', 0, '', ''),
    ('广告投放', 'TikTok广告后台', '熟练', 0, '', ''),
    ('广告投放', '定向设置', '熟练', 0, '', ''),
    ('广告投放', 'ROI优化', '精通', 0, '', ''),
    ('达人合作', '达人筛选', '熟练', 0, '', ''),
    ('达人合作', '建联话术', '熟练', 0, '', ''),
    ('达人合作', '佣金结算', '熟练', 0, '', ''),
    ('私域运营', 'WhatsApp运营', '熟练', 0, '', ''),
    ('私域运营', '会员体系', '熟练', 0, '', ''),
    ('供应链', '物流选择', '熟练', 0, '', ''),
    ('供应链', '备货策略', '熟练', 0, '', ''),
    ('财务管理', '成本利润计算', '精通', 0, '', ''),
    ('财务管理', '现金流管理', '熟练', 0, '', ''),
]

for row_num, data in enumerate(skills_checklist, 4):
    for col, value in enumerate(data, 1):
        cell = ws6.cell(row=row_num, column=col, value=value)
        cell.font = normal_font
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border

# 设置列宽
column_widths6 = [15, 20, 12, 12, 15, 25]
for i, width in enumerate(column_widths6, 1):
    ws6.column_dimensions[get_column_letter(i)].width = width

# ==================== 工作表7：财务追踪 ====================
ws7 = wb.create_sheet("财务追踪")

ws7.merge_cells('A1:K1')
ws7['A1'] = '💰 财务收支追踪表'
ws7['A1'].font = Font(name='微软雅黑', size=16, bold=True, color='4472C4')
ws7['A1'].alignment = Alignment(horizontal='center', vertical='center')

headers7 = ['月份', 'GMV($)', '产品成本', '物流成本', '平台佣金', '广告费', '其他费用', '总成本', '净利润', '利润率', 'ROI']
for col, header in enumerate(headers7, 1):
    cell = ws7.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

# 预设月份行
for row_num, month in enumerate(['第1月', '第2月', '第3月'], 4):
    ws7.cell(row=row_num, column=1, value=month).border = thin_border
    for col in range(2, 12):
        ws7.cell(row=row_num, column=col, value='').border = thin_border

# 设置列宽
column_widths7 = [10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 10]
for i, width in enumerate(column_widths7, 1):
    ws7.column_dimensions[get_column_letter(i)].width = width

# 添加公式说明
ws7['A8'] = '公式说明：'
ws7['A8'].font = Font(name='微软雅黑', size=11, bold=True)
ws7['A9'] = '总成本 = 产品成本 + 物流成本 + 平台佣金 + 广告费 + 其他费用'
ws7['A10'] = '净利润 = GMV - 总成本'
ws7['A11'] = '利润率 = 净利润 / GMV × 100%'
ws7['A12'] = 'ROI = GMV / 总成本'

# 保存文件
output_path = '/Users/heguohua/low-coding/TikTok跨境电商90天学习计划.xlsx'
wb.save(output_path)
print(f'Excel文件已生成: {output_path}')
