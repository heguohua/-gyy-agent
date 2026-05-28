#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TikTok跨境电商90天学习计划 + 薪资指南Excel生成器
"""

import openpyxl
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, Border, Side, PatternFill
from openpyxl.utils import get_column_letter
import datetime

# 创建工作簿
wb = Workbook()

# 定义样式
header_font = Font(name='微软雅黑', size=11, bold=True, color='FFFFFF')
header_fill = PatternFill(start_color='4472C4', end_color='4472C4', fill_type='solid')
title_font = Font(name='微软雅黑', size=14, bold=True, color='2F5496')
normal_font = Font(name='微软雅黑', size=10)
money_font = Font(name='微软雅黑', size=11, bold=True, color='C00000')
thin_border = Border(
    left=Side(style='thin'),
    right=Side(style='thin'),
    top=Side(style='thin'),
    bottom=Side(style='thin')
)
complete_fill = PatternFill(start_color='C6EFCE', end_color='C6EFCE', fill_type='solid')
in_progress_fill = PatternFill(start_color='FFEB9C', end_color='FFEB9C', fill_type='solid')
pending_fill = PatternFill(start_color='FFC7CE', end_color='FFC7CE', fill_type='solid')
highlight_fill = PatternFill(start_color='D9E1F2', end_color='D9E1F2', fill_type='solid')

# ==================== 工作表1：每日任务清单（90天） ====================
ws1 = wb.active
ws1.title = "每日任务清单"

# 标题
ws1.merge_cells('A1:M1')
ws1['A1'] = '📅 TikTok跨境电商90天学习计划 - 每日任务清单（含AI运营+薪资指南）'
ws1['A1'].font = Font(name='微软雅黑', size=14, bold=True, color='2F5496')
ws1['A1'].alignment = Alignment(horizontal='center', vertical='center')
ws1.row_dimensions[1].height = 35

# 说明
ws1.merge_cells('A2:M2')
ws1['A2'] = '目标：3个月达到2年TikTok跨境电商运营水平 + AI自动化运营能力 + 实现月入RM 5,500-8,000'
ws1['A2'].font = Font(name='微软雅黑', size=10, italic=True)
ws1['A2'].alignment = Alignment(horizontal='center')

# 表头
headers = ['日期', '星期', '阶段', '周次', '任务类型', '具体任务', '量化指标', '目标值', '实际值', '完成状态', '自我评分', 'AI工具', '备注']
for col, header in enumerate(headers, 1):
    cell = ws1.cell(row=4, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
    cell.border = thin_border
ws1.row_dimensions[4].height = 30

# 90天任务数据
week_data = {
    # 第1阶段：入门期（第1-4周）
    1: [
        ('平台入门', '注册TikTok店铺', '完成店铺注册', 1, 'ChatGPT学习开店流程'),
        ('平台入门', '设置店铺信息', '店铺信息完整度', 100, 'ChatGPT生成店铺文案'),
        ('选品找货', '搜索头巾防滑夹产品', '收藏产品数', 30, 'ChatGPT辅助选品'),
        ('选品找货', '联系供应商询价', '联系供应商数', 10, 'ChatGPT写询盘话术'),
        ('上架优化', '学习Listing优化', '掌握知识点', 10, 'ChatGPT学习教程'),
        ('内容创作', '拍摄第一条视频', '视频条数', 1, '剪映剪辑+AI字幕'),
        ('数据分析', '查看店铺后台数据', '熟悉功能', 5, 'ChatGPT分析数据'),
    ],
    2: [
        ('选品找货', '购买样品测试', '购买样品数', 5, '1688采购'),
        ('上架优化', '上架5款产品', '上架产品数', 5, 'ChatGPT生成描述'),
        ('上架优化', '优化产品主图', '完成主图数', 5, 'Canva AI设计'),
        ('上架优化', '撰写产品描述', '完成描述数', 5, 'ChatGPT文案生成'),
        ('内容创作', '发布3条视频', '发布视频数', 3, '剪映AI剪辑'),
        ('内容创作', '学习剪映基础', '掌握功能', 10, '剪映教程'),
        ('数据分析', '分析竞品数据', '分析竞品', 5, 'ChatGPT辅助分析'),
    ],
    3: [
        ('上架优化', '上架5款产品', '上架产品数', 5, 'ChatGPT生成文案'),
        ('内容创作', '发布5条视频', '发布视频数', 5, '剪映+AI特效'),
        ('内容创作', '学习拍摄技巧', '掌握技巧', 8, 'YouTube学习'),
        ('数据分析', '查看店铺数据日报', '查看天数', 7, '后台数据查看'),
        ('选品找货', '确定主推产品', '确定款数', 3, '数据分析选品'),
        ('达人合作', '了解达人合作模式', '了解模式', 3, 'ChatGPT学习'),
        ('私域运营', '注册WhatsApp Business', '完成注册', 1, 'WhatsApp设置'),
    ],
    4: [
        ('数据分析', '完成数据分析周报', '报告完成度', 100, 'ChatGPT生成报告'),
        ('广告投放', '学习TikTok广告基础', '掌握知识点', 15, 'TikTok Ads学习'),
        ('广告投放', '创建第一个广告', '广告数', 1, 'Ads Manager'),
        ('内容创作', '发布7条视频', '发布视频数', 7, '剪映批量剪辑'),
        ('达人合作', '搜索潜在达人', '找到达人', 20, 'Creator Marketplace'),
        ('达人合作', '发送合作邀请', '发送邀请', 10, 'ChatGPT写邮件'),
        ('第1月复盘', '第1月复盘总结', '总结完成度', 100, 'Notion记录'),
    ],
    # 第2阶段：成长期（第5-8周）
    5: [
        ('数据分析', '分析广告数据', '分析广告', 3, '后台数据分析'),
        ('数据分析', '制定优化方案', '方案完整性', 100, 'ChatGPT生成'),
        ('广告投放', '优化广告定向', '优化次数', 3, 'Ads优化'),
        ('广告投放', '测试不同素材', '测试素材', 5, 'Midjourney生成'),
        ('内容创作', '发布5条视频', '发布视频数', 5, '剪映+AI'),
        ('达人合作', '跟进达人回复', '跟进次数', 10, 'WhatsApp沟通'),
        ('私域运营', '添加客户到私域', '添加客户', 50, 'WhatsApp添加'),
    ],
    6: [
        ('广告投放', '创建3个广告计划', '广告计划', 3, 'Ads Manager'),
        ('广告投放', '分析ROI数据', '分析准确性', 90, 'Excel+AI分析'),
        ('广告优化', '优化广告效果', '目标ROI', 1.5, '数据分析优化'),
        ('内容创作', '发布5条视频', '发布视频数', 5, '剪映批量'),
        ('达人合作', '与达人建立合作', '合作成功', 3, '签订合作'),
        ('达人合作', '寄样给达人', '寄样品', 5, '物流跟踪'),
        ('数据分析', '查看店铺周数据', '查看天数', 7, '后台数据'),
    ],
    7: [
        ('达人合作', '跟踪达人内容发布', '跟踪次数', 5, '达人后台'),
        ('达人合作', '分析带货数据', '分析报告', 3, 'ChatGPT分析'),
        ('内容创作', '发布5条视频', '发布视频数', 5, 'AI辅助创作'),
        ('爆款打造', '分析爆款特征', '分析款数', 10, '数据分析'),
        ('数据分析', '完成数据分析报告', '报告完成度', 100, 'ChatGPT报告'),
        ('私域运营', '发布促销信息', '发布次数', 2, 'WhatsApp群发'),
        ('第2月复盘', '第7周复盘', '总结完成度', 100, 'Notion复盘'),
    ],
    8: [
        ('爆款打造', '制定爆款打造方案', '方案完整性', 100, 'ChatGPT方案'),
        ('供应链优化', '批量采购谈判', '谈判次数', 5, '1688谈判'),
        ('供应链优化', '优化物流方案', '成本降低', 10, '物流比价'),
        ('内容创作', '发布5条视频', '发布视频数', 5, 'AI创作'),
        ('广告投放', '加大爆款广告投入', '广告计划', 3, 'ROI优化'),
        ('达人合作', '拓展新达人', '新增达人', 10, 'Creator搜索'),
        ('私域运营', '添加客户到私域', '添加客户', 100, '多渠道引流'),
    ],
    # 第3阶段：精通期（第9-12周）
    9: [
        ('爆款打造', '爆款开始起量', '爆款订单', 100, '数据分析'),
        ('爆款打造', '维护爆款', '维护措施', 5, '运营优化'),
        ('内容创作', '发布7条视频', '发布视频数', 7, 'AI高效创作'),
        ('供应链优化', '确认爆款备货', '备货数量', 500, '1688采购'),
        ('数据分析', '分析爆款数据', '分析报告', 4, 'AI分析'),
        ('私域运营', '收集用户反馈', '收集反馈', 50, 'WhatsApp'),
        ('第2月复盘', '第9周复盘', '总结完成度', 100, 'Notion'),
    ],
    10: [
        ('规模化运营', '多产品矩阵规划', '规划产品', 10, 'Excel规划'),
        ('内容创作', '发布5条视频', '发布视频数', 5, 'AI批量'),
        ('达人合作', '与更多达人合作', '新增合作', 5, '深化合作'),
        ('私域运营', '推出会员计划', '计划完整性', 100, 'ChatGPT设计'),
        ('财务管理', '学习成本利润计算', '掌握公式', 10, 'Excel模板'),
        ('数据分析', '完成数据分析报告', '报告完成度', 100, 'AI报告'),
        ('求职准备', '准备简历和作品集', '完成度', 100, '简历制作'),
    ],
    11: [
        ('规模化运营', '多账号运营学习', '掌握平台', 2, '多平台学习'),
        ('内容创作', '发布7条视频', '发布视频数', 7, 'AI创作'),
        ('爆款复制', '复制爆款到新产品', '复制款数', 3, '数据分析'),
        ('私域运营', '复购引导', '复购率提升', 20, '营销策略'),
        ('供应链优化', '找马来本地仓', '仓库数', 3, '物流调研'),
        ('数据分析', '查看店铺数据', '查看天数', 7, '日常查看'),
        ('求职面试', '投递简历', '投递数量', 20, '多平台投递'),
    ],
    12: [
        ('规模化运营', '制定规模化方案', '方案完整性', 100, '运营方案'),
        ('内容创作', '发布7条视频', '发布视频数', 7, 'AI批量'),
        ('财务管理', '制作财务收支表', '表格完成度', 100, 'Excel模板'),
        ('数据分析', '完成月度数据复盘', '复盘完成度', 100, 'AI复盘'),
        ('达人合作', '评估达人ROI', '评估达人', 10, '数据分析'),
        ('私域运营', '私域GMV占比', '占比目标', 20, '私域转化'),
        ('第3月/求职', '面试+定薪资', '薪资目标', 5500, '谈判技巧'),
    ],
    # 第4阶段：收尾（第13-14周）
    13: [
        ('持续优化', '优化店铺运营', '优化措施', 10, '全面优化'),
        ('内容创作', '发布7条视频', '发布视频数', 7, 'AI创作'),
        ('数据分析', '分析月度数据', '分析准确性', 95, 'AI分析'),
        ('达人合作', '维护达人关系', '维护次数', 10, '关系维护'),
        ('私域运营', '提升私域服务', '服务优化', 5, '客服优化'),
        ('AI运营', '学习AI自动化', '掌握工具', 5, 'Zapier/Make'),
        ('求职offer', '对比offer', 'offer数量', 3, '对比分析'),
    ],
    14: [
        ('未来规划', '制定下季度目标', '目标完整性', 100, 'Notion规划'),
        ('持续优化', '优化全流程', '优化点数', 15, 'SOP优化'),
        ('内容创作', '发布7条视频', '发布视频数', 7, 'AI批量'),
        ('数据分析', '完成最终数据报告', '报告完整度', 100, 'AI报告'),
        ('财务管理', '计算3月盈利', '盈利金额', 1000, '财务计算'),
        ('能力验证', '验证2年运营水平', '能力达成率', 100, '自检清单'),
        ('学习总结', '90天学习总结', '总结完整性', 100, '全面复盘'),
    ],
}

# 填充数据
row_num = 5
for week in range(1, 15):
    tasks = week_data.get(week, [])
    for task in tasks:
        stage = ''
        if week <= 4:
            stage = '第1阶段：入门'
        elif week <= 8:
            stage = '第2阶段：成长'
        elif week <= 12:
            stage = '第3阶段：精通'
        else:
            stage = '第4阶段：收尾'
        
        start_date = datetime.date(2026, 4, 12)
        current_date = start_date + datetime.timedelta(days=row_num - 5)
        weekday = ['一', '二', '三', '四', '五', '六', '日'][current_date.weekday()]
        
        data = [
            current_date.strftime('%Y-%m-%d'),
            f'周{week}/周{weekday}',
            stage,
            f'第{week}周',
            task[0],
            task[1],
            task[2],
            task[3],
            '',
            '未开始',
            '',
            task[4],
            ''
        ]
        
        for col, value in enumerate(data, 1):
            cell = ws1.cell(row=row_num, column=col, value=value)
            cell.font = normal_font
            cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
            cell.border = thin_border
            
            if col == 10:
                cell.fill = pending_fill
        
        row_num += 1

# 设置列宽
widths = [12, 10, 14, 8, 12, 22, 15, 10, 10, 10, 10, 18, 20]
for i, w in enumerate(widths, 1):
    ws1.column_dimensions[get_column_letter(i)].width = w

# ==================== 工作表2：周目标追踪 ====================
ws2 = wb.create_sheet("周目标追踪")

ws2.merge_cells('A1:K1')
ws2['A1'] = '📊 14周目标追踪表（含薪资目标）'
ws2['A1'].font = title_font
ws2['A1'].alignment = Alignment(horizontal='center', vertical='center')
ws2.row_dimensions[1].height = 35

headers2 = ['周次', '阶段', '周主题', '核心技能', '交付物', '视频目标', '产品目标', 'GMV目标($)', '私域目标', '薪资对标(RM)', '完成状态']
for col, header in enumerate(headers2, 1):
    cell = ws2.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

week_summary = [
    ('第1周', '入门期', '平台认知与账号搭建', '店铺注册、信息设置', '开通店铺', 5, 5, 0, 0, '实习/助理: 2000-3000', '未完成'),
    ('第2周', '入门期', '选品基础与1688找货', '选品理论、1688实操', '10款产品', 5, 10, 0, 0, '实习: 2000-2500', '未完成'),
    ('第3周', '入门期', '产品上架与Listing优化', '上架、标题、图片', '10个Listing', 7, 15, 50, 0, '初级: 2500-3500', '未完成'),
    ('第4周', '入门期', '内容创作入门+复盘', '拍摄、剪辑、发布', '10条视频', 10, 20, 100, 20, '初级: 2800-3800', '未完成'),
    ('第5周', '成长期', '数据分析与店铺优化', '数据看板、优化策略', '数据报告', 7, 25, 200, 50, '初级+: 3200-4200', '未完成'),
    ('第6周', '成长期', '数据分析与A/B测试', '测试、优化', '优化方案', 7, 30, 300, 80, '初级+: 3500-4500', '未完成'),
    ('第7周', '成长期', '广告投放入门', '千川广告、投放后台', '3个广告', 7, 35, 500, 100, '中级: 4000-5500', '未完成'),
    ('第8周', '成长期', '广告投放优化+达人', '素材测试、定向优化', '优化记录', 7, 40, 800, 150, '中级: 4500-6000', '未完成'),
    ('第9周', '精通期', '达人合作与带货', '建联、寄样、合作', '5个合作', 7, 45, 1000, 200, '中级+: 5000-7000', '未完成'),
    ('第10周', '精通期', '达人管理与私域', '数据追踪、佣金结算', '数据报告', 7, 50, 1500, 300, '中级+: 5500-7500', '未完成'),
    ('第11周', '精通期', '爆款打造与规模化', '爆款特征、选品', '1-2个爆款', 7, 55, 2000, 400, '高级: 6000-8500', '未完成'),
    ('第12周', '精通期', '供应链优化+求职', '批量采购、物流', '求职作品集', 7, 60, 3000, 500, '高级: 7000-10000', '未完成'),
    ('第13周', '收尾期', 'AI自动化+offer对比', 'AI运营、自动化工具', 'AI技能', 7, 65, 3500, 600, 'AI运营: 7500-11000', '未完成'),
    ('第14周', '收尾期', '复盘总结与入职', '财务、规划、谈判', '入职offer', 7, 70, 4000, 700, '目标: 5500-8000', '未完成'),
]

for row_num, data in enumerate(week_summary, 4):
    for col, value in enumerate(data, 1):
        cell = ws2.cell(row=row_num, column=col, value=value)
        cell.font = normal_font if col != 10 else Font(name='微软雅黑', size=10, bold=True, color='C00000')
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border
        
        if col == 11:
            cell.fill = pending_fill

widths2 = [8, 10, 20, 22, 15, 10, 10, 12, 12, 18, 12]
for i, w in enumerate(widths2, 1):
    ws2.column_dimensions[get_column_letter(i)].width = w

# ==================== 工作表3：月度目标 ====================
ws3 = wb.create_sheet("月度目标")

ws3.merge_cells('A1:I1')
ws3['A1'] = '🎯 月度目标与里程碑（含薪资）'
ws3['A1'].font = title_font
ws3['A1'].alignment = Alignment(horizontal='center', vertical='center')
ws3.row_dimensions[1].height = 35

headers3 = ['月份', '阶段', '核心目标', '视频发布', '产品上架', 'GMV目标', '净利润', '可求职岗位', '薪资范围(RM)']
for col, header in enumerate(headers3, 1):
    cell = ws3.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

monthly = [
    ('第1月', '入门期', '掌握平台基础，能独立上架和发布内容', 20, 30, '$200-500', '$0-100', 'TikTok运营助理/实习生', '2,000-3,500'),
    ('第2月', '成长期', '掌握数据分析和广告投放，能开始盈利', 40, 50, '$1,500-2,500', '$300-600', 'TikTok运营专员', '3,500-5,500'),
    ('第3月', '精通期', '独立运营+AI自动化，月销$3000+', 60, 80, '$3,000-5,000', '$900-1,500', 'AI电商运营/高级专员', '5,500-8,000'),
]

for row_num, data in enumerate(monthly, 4):
    for col, value in enumerate(data, 1):
        cell = ws3.cell(row=row_num, column=col, value=value)
        cell.font = normal_font if col != 9 else money_font
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border

widths3 = [10, 10, 30, 12, 12, 14, 12, 22, 18]
for i, w in enumerate(widths3, 1):
    ws3.column_dimensions[get_column_letter(i)].width = w

# ==================== 工作表4：薪资岗位指南 ====================
ws4 = wb.create_sheet("薪资岗位指南")

ws4.merge_cells('A1:G1')
ws4['A1'] = '💰 薪资岗位完全指南（含AI运营岗位）'
ws4['A1'].font = title_font
ws4['A1'].alignment = Alignment(horizontal='center', vertical='center')
ws4.row_dimensions[1].height = 35

# 说明
ws4.merge_cells('A2:G2')
ws4['A2'] = '3个月后你的水平：TikTok运营（1.5-2年经验）+ AI自动化运营能力 = 月入RM 5,500-8,000'
ws4['A2'].font = Font(name='微软雅黑', size=11, bold=True, color='C00000')
ws4['A2'].alignment = Alignment(horizontal='center')

headers4 = ['岗位名称', '公司类型', 'AI能力要求', '月薪(RM)', 'AI加成后(RM)', '年薪(RM)', '求职难度']
for col, header in enumerate(headers4, 1):
    cell = ws4.cell(row=4, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

salary_data = [
    # 马来西亚本地岗位
    ('【马来西亚本地岗位】', '', '', '', '', '', ''),
    ('TikTok运营助理', '本地中小企业', '基础AI工具', '2,500-3,500', '2,800-4,000', '33,000-48,000', '⭐'),
    ('TikTok运营专员', '本地电商公司', 'ChatGPT+剪映', '3,500-5,000', '4,000-6,000', '48,000-72,000', '⭐⭐'),
    ('跨境电商运营', '中国公司马来分部', 'AI文案+数据分析', '4,500-7,000', '5,500-8,500', '66,000-102,000', '⭐⭐⭐'),
    ('内容运营专员', 'MCN机构', 'AI视频+AI图片', '3,500-5,500', '4,200-6,600', '50,000-79,000', '⭐⭐'),
    ('直播运营', '电商公司', '基础AI', '4,000-6,000', '4,600-7,000', '55,000-84,000', '⭐⭐'),
    ('社媒运营主管', '品牌公司', 'AI+团队管理', '7,000-10,000', '8,500-12,000', '102,000-144,000', '⭐⭐⭐⭐'),
    # AI运营专项岗位
    ('【AI运营专项岗位】', '', '', '', '', '', ''),
    ('AI电商运营专员', '科技电商公司', 'AI自动化+工具链', '5,000-8,000', '6,000-10,000', '72,000-120,000', '⭐⭐⭐'),
    ('AI内容运营', 'MCN/科技公司', 'Midjourney+AIGC', '6,000-10,000', '7,500-12,500', '90,000-150,000', '⭐⭐⭐'),
    ('AI广告投放师', '广告公司/甲方', 'AI素材+自动化', '7,000-12,000', '8,500-15,000', '102,000-180,000', '⭐⭐⭐⭐'),
    ('AI运营主管', '中大型电商', 'AI策略+团队', '10,000-15,000', '12,500-20,000', '150,000-240,000', '⭐⭐⭐⭐⭐'),
    # 远程/跨境岗位
    ('【远程跨境岗位】', '', '', '', '', '', ''),
    ('TikTok远程运营', '中国跨境公司', 'AI+独立运营', '¥6,000-10,000', '¥7,200-12,000', '¥86,000-144,000', '⭐⭐'),
    ('AI运营专员(远程)', '中国科技公司', 'AI全栈能力', '¥8,000-15,000', '¥10,400-19,500', '¥125,000-234,000', '⭐⭐⭐'),
    ('高级AI运营(远程)', '中国大公司', 'AI专家级', '¥12,000-20,000', '¥15,600-26,000', '¥187,000-312,000', '⭐⭐⭐⭐'),
    # 自由职业
    ('【自由职业/创业】', '', '', '', '', '', ''),
    ('单店代运营', '自由职业', 'AI提效50%', '4,000-8,000/店', '效率翻倍', '48,000-96,000/店', '⭐⭐'),
    ('AI代运营工作室', '创业', 'AI工具链', '10,000-20,000', '15,000-30,000', '180,000-360,000', '⭐⭐⭐⭐'),
    ('AI运营培训师', '知识付费', 'AI+教学', '8,000-15,000', '12,000-25,000', '144,000-300,000', '⭐⭐⭐'),
]

for row_num, data in enumerate(salary_data, 5):
    for col, value in enumerate(data, 1):
        cell = ws4.cell(row=row_num, column=col, value=value)
        if value and '【' in str(value):
            cell.font = Font(name='微软雅黑', size=11, bold=True, color='2F5496')
            cell.fill = highlight_fill
        else:
            cell.font = normal_font
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border

widths4 = [22, 20, 18, 15, 18, 15, 12]
for i, w in enumerate(widths4, 1):
    ws4.column_dimensions[get_column_letter(i)].width = w

# ==================== 工作表5：AI工具清单 ====================
ws5 = wb.create_sheet("AI工具清单")

ws5.merge_cells('A1:G1')
ws5['A1'] = '🤖 AI工具必学清单（按优先级）'
ws5['A1'].font = title_font
ws5['A1'].alignment = Alignment(horizontal='center', vertical='center')
ws5.row_dimensions[1].height = 35

headers5 = ['工具名称', '类型', '主要用途', '使用频率', '成本', '学习优先级', '掌握度(0-10)']
for col, header in enumerate(headers5, 1):
    cell = ws5.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

ai_tools = [
    # 必须掌握
    ('ChatGPT Plus', 'AI对话', '文案、脚本、分析、选品、客服', '每天', '$20/月', '⭐⭐⭐⭐⭐', 0),
    ('剪映专业版', '视频剪辑', '剪辑、AI字幕、AI配音、AI特效', '每天', '免费', '⭐⭐⭐⭐⭐', 0),
    ('Canva Pro', '设计工具', '主图、海报、封面、logo', '每天', '$13/月', '⭐⭐⭐⭐⭐', 0),
    ('Notion AI', '笔记管理', '学习笔记、任务管理、计划追踪', '每天', '免费', '⭐⭐⭐⭐', 0),
    ('1688', '采购平台', '找货、供应商、拿样、比价', '每天', '免费', '⭐⭐⭐⭐⭐', 0),
    # 推荐工具
    ('Midjourney', 'AI绘图', '产品图、场景图、广告素材', '每周3次', '$30/月', '⭐⭐⭐', 0),
    ('ElevenLabs', 'AI配音', '多语言配音、马来英语', '每周2次', '免费试用', '⭐⭐⭐', 0),
    ('TikTok Ads', '广告投放', '千川广告、定向、投放优化', '每天', '消耗额', '⭐⭐⭐⭐', 0),
    ('TikBuddy', '数据分析', '竞品分析、广告素材', '每周3次', '$30/月', '⭐⭐⭐', 0),
    ('店小秘', 'ERP工具', '订单管理、批量上架', '每天', '免费/$30月', '⭐⭐⭐⭐', 0),
    ('WhatsApp Business', '私域工具', '客户管理、群发、自动回复', '每天', '免费', '⭐⭐⭐⭐', 0),
    # 进阶工具
    ('ManyChat', '私域自动化', '自动回复、流程自动化', '每周', '$15月', '⭐⭐', 0),
    ('Keepa', '市场调研', '竞品价格追踪、销量预测', '每周2次', '$30月', '⭐⭐', 0),
    ('Zapier/Make', '工作流自动化', '多工具串联、自动化', '每周', '$25月', '⭐⭐⭐', 0),
    ('Excel/Sheets+AI', '数据分析', '财务计算、数据整理', '每天', '免费', '⭐⭐⭐⭐', 0),
    ('Figma+AI', '设计协作', '团队设计协作', '每周', '免费/$12月', '⭐⭐', 0),
    ('Claude Pro', 'AI分析', '复杂分析、代码、长文本', '每周', '$20月', '⭐⭐⭐', 0),
]

for row_num, data in enumerate(ai_tools, 4):
    for col, value in enumerate(data, 1):
        cell = ws5.cell(row=row_num, column=col, value=value)
        if '⭐⭐⭐⭐⭐' in str(value):
            cell.font = Font(name='微软雅黑', size=10, bold=True, color='C00000')
        else:
            cell.font = normal_font
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border

widths5 = [18, 14, 28, 12, 12, 12, 14]
for i, w in enumerate(widths5, 1):
    ws5.column_dimensions[get_column_letter(i)].width = w

# ==================== 工作表6：AI自动化技能路径 ====================
ws6 = wb.create_sheet("AI自动化技能")

ws6.merge_cells('A1:F1')
ws6['A1'] = '🚀 AI自动化运营技能学习路径'
ws6['A1'].font = title_font
ws6['A1'].alignment = Alignment(horizontal='center', vertical='center')
ws6.row_dimensions[1].height = 35

headers6 = ['阶段', '时间', '学习内容', '掌握目标', '效率提升', '可求职岗位']
for col, header in enumerate(headers6, 1):
    cell = ws6.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

ai_path = [
    ('Level 1', '第1-2周', 'ChatGPT深度应用', '独立用AI完成日常文案工作', '效率提升50%', '运营助理'),
    ('Level 1', '第1-2周', '剪映AI：字幕+配音', '自动生成字幕、AI配音', '剪辑时间-60%', '内容运营'),
    ('Level 1', '第1-2周', 'Canva AI：主图设计', 'AI生成产品主图、海报', '设计时间-70%', '设计助理'),
    ('Level 2', '第3-4周', 'Midjourney产品图', 'AI生成产品场景图', '省去拍摄成本', '内容专员'),
    ('Level 2', '第3-4周', 'AI数据分析', '用AI解读数据、生成报告', '分析时间-80%', '运营专员'),
    ('Level 2', '第3-4周', 'AI选品自动化', 'AI辅助选品、竞品分析', '选品效率+100%', '选品专员'),
    ('Level 3', '第5-8周', 'AI广告素材生成', 'Midjourney+AI批量素材', '素材产出+200%', '广告投放'),
    ('Level 3', '第5-8周', 'AI私域运营', '自动回复、群发、会员管理', '客服效率+300%', '私域运营'),
    ('Level 3', '第5-8周', 'AI达人管理', 'AI建联话术、数据追踪', '达人管理+150%', '达人运营'),
    ('Level 4', '第9-12周', 'Zapier工作流自动化', '多工具串联、自动运行', '运营效率+400%', 'AI运营专员'),
    ('Level 4', '第9-12周', 'Python+AI自动化', '数据自动分析、报表生成', '解放双手', '数据运营'),
    ('Level 4', '第9-12周', 'AI运营策略制定', '用AI制定运营方案', '方案质量+50%', '运营主管'),
]

for row_num, data in enumerate(ai_path, 4):
    for col, value in enumerate(data, 1):
        cell = ws6.cell(row=row_num, column=col, value=value)
        if col == 1:
            cell.font = Font(name='微软雅黑', size=10, bold=True, color='2F5496')
        else:
            cell.font = normal_font
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border

widths6 = [10, 10, 20, 22, 14, 16]
for i, w in enumerate(widths6, 1):
    ws6.column_dimensions[get_column_letter(i)].width = w

# ==================== 工作表7：求职准备清单 ====================
ws7 = wb.create_sheet("求职准备清单")

ws7.merge_cells('A1:E1')
ws7['A1'] = '📝 求职准备清单（3个月后）'
ws7['A1'].font = title_font
ws7['A1'].alignment = Alignment(horizontal='center', vertical='center')
ws7.row_dimensions[1].height = 35

headers7 = ['求职材料', '具体内容', 'AI工具辅助', '完成度', '备注']
for col, header in enumerate(headers7, 1):
    cell = ws7.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

resume_items = [
    ('简历', '个人信息+技能+经验', 'ChatGPT生成+优化', 0, ''),
    ('作品集', '店铺数据截图+视频作品', '剪映整理+Canva排版', 0, ''),
    ('AI运营案例', 'AI工具使用效果数据', 'ChatGPT整理+Excel图表', 0, ''),
    ('自我介绍', '1分钟/3分钟版本', 'ChatGPT写+AI配音练习', 0, ''),
    ('薪资期望', 'RM 5,500-8,000', 'ChatGPT模拟谈判', 0, ''),
    ('求职平台', 'LinkedIn+Jobstreet+Indeed', 'AI优化简历关键词', 0, ''),
    ('作品集链接', 'TikTok视频链接+数据', 'Bitly短链接', 0, ''),
    ('GitHub/Notion', 'AI工作流展示', 'Notion公开页面', 0, ''),
]

for row_num, data in enumerate(resume_items, 4):
    for col, value in enumerate(data, 1):
        cell = ws7.cell(row=row_num, column=col, value=value)
        cell.font = normal_font
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border

widths7 = [15, 25, 22, 10, 20]
for i, w in enumerate(widths7, 1):
    ws7.column_dimensions[get_column_letter(i)].width = w

# ==================== 工作表8：每日任务模板 ====================
ws8 = wb.create_sheet("每日任务模板")

ws8.merge_cells('A1:E1')
ws8['A1'] = '📝 每日任务执行模板'
ws8['A1'].font = title_font
ws8['A1'].alignment = Alignment(horizontal='center', vertical='center')

daily_tasks = [
    ('必做任务', '发布1条视频', '拍摄+剪辑+发布', '1条', ''),
    ('必做任务', '回复评论', '全部回复，引导互动', '100%回复', ''),
    ('必做任务', '查看数据', '曝光、点击、转化', '记录数据', ''),
    ('必做任务', 'ChatGPT学习', '学习新知识/解决问题', '30分钟', ''),
    ('必做任务', 'AI工具练习', '练习当天学习的AI工具', '1个技能', ''),
    ('选做任务', '联系达人', '发送合作邀请', '5个', ''),
    ('选做任务', '优化Listing', '标题/图片/描述', '2款', ''),
    ('选做任务', '私域运营', '发布促销/添加客户', '20个', ''),
    ('选做任务', '广告投放', '查看广告/优化定向', '调整1次', ''),
]

headers8 = ['任务类型', '任务名称', '执行要点', '量化指标', '完成情况']
for col, header in enumerate(headers8, 1):
    cell = ws8.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

for row_num, data in enumerate(daily_tasks, 4):
    for col, value in enumerate(data, 1):
        cell = ws8.cell(row=row_num, column=col, value=value)
        cell.font = normal_font
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border

widths8 = [12, 18, 30, 15, 15]
for i, w in enumerate(widths8, 1):
    ws8.column_dimensions[get_column_letter(i)].width = w

# ==================== 工作表9：技能验证清单 ====================
ws9 = wb.create_sheet("技能验证清单")

ws9.merge_cells('A1:F1')
ws9['A1'] = '✅ 90天后技能验证清单'
ws9['A1'].font = title_font
ws9['A1'].alignment = Alignment(horizontal='center', vertical='center')

headers9 = ['技能分类', '具体技能', '要求水平', '当前水平', '差距', '行动计划']
for col, header in enumerate(headers9, 1):
    cell = ws9.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

skills = [
    ('店铺运营', '店铺搭建与设置', '精通', 0, '', ''),
    ('选品能力', '1688选品技巧', '精通', 0, '', ''),
    ('选品能力', '利润计算模型', '精通', 0, '', ''),
    ('上架技能', 'Listing优化', '精通', 0, '', ''),
    ('上架技能', '主图视频制作', '熟练', 0, '', ''),
    ('内容创作', '短视频拍摄', '熟练', 0, '', ''),
    ('内容创作', '剪映剪辑', '精通', 0, '', ''),
    ('数据分析', '后台数据查看', '精通', 0, '', ''),
    ('数据分析', 'A/B测试方法', '熟练', 0, '', ''),
    ('广告投放', 'TikTok广告后台', '熟练', 0, '', ''),
    ('广告投放', 'ROI优化', '精通', 0, '', ''),
    ('达人合作', '达人筛选与建联', '熟练', 0, '', ''),
    ('私域运营', 'WhatsApp运营', '熟练', 0, '', ''),
    ('供应链', '物流选择与备货', '熟练', 0, '', ''),
    ('财务管理', '成本利润计算', '精通', 0, '', ''),
    # AI技能
    ('AI运营', 'ChatGPT高级应用', '精通', 0, '', ''),
    ('AI运营', '剪映AI功能', '精通', 0, '', ''),
    ('AI运营', 'Canva AI设计', '熟练', 0, '', ''),
    ('AI运营', 'Midjourney绘图', '熟练', 0, '', ''),
    ('AI运营', 'AI数据分析', '熟练', 0, '', ''),
    ('AI运营', 'AI自动化工具', '掌握', 0, '', ''),
]

for row_num, data in enumerate(skills, 4):
    for col, value in enumerate(data, 1):
        cell = ws9.cell(row=row_num, column=col, value=value)
        cell.font = normal_font
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border

widths9 = [14, 20, 12, 12, 15, 25]
for i, w in enumerate(widths9, 1):
    ws9.column_dimensions[get_column_letter(i)].width = w

# ==================== 工作表10：财务追踪 ====================
ws10 = wb.create_sheet("财务追踪")

ws10.merge_cells('A1:K1')
ws10['A1'] = '💰 财务收支追踪表（90天学习投入产出）'
ws10['A1'].font = title_font
ws10['A1'].alignment = Alignment(horizontal='center', vertical='center')

headers10 = ['月份', 'GMV($)', '产品成本', '物流成本', '平台佣金', '广告费', '其他费用', '总成本', '净利润', '利润率', 'ROI']
for col, header in enumerate(headers10, 1):
    cell = ws10.cell(row=3, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

for row_num, month in enumerate(['第1月', '第2月', '第3月', '累计'], 4):
    cell = ws10.cell(row=row_num, column=1, value=month)
    cell.font = Font(name='微软雅黑', size=10, bold=True)
    cell.border = thin_border
    for col in range(2, 12):
        cell = ws10.cell(row=row_num, column=col, value='')
        cell.border = thin_border

# 公式说明
ws10['A9'] = '📌 公式说明：'
ws10['A9'].font = Font(name='微软雅黑', size=11, bold=True)
ws10['A10'] = '总成本 = 产品成本 + 物流成本 + 平台佣金(5-8%) + 广告费 + 其他费用'
ws10['A11'] = '净利润 = GMV - 总成本'
ws10['A12'] = '利润率 = 净利润 / GMV × 100%'
ws10['A13'] = 'ROI = GMV / 总成本'
ws10['A15'] = '💡 建议：目标利润率 >30%，ROI > 1.5'
ws10['A15'].font = Font(name='微软雅黑', size=11, bold=True, color='C00000')

widths10 = [10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 10]
for i, w in enumerate(widths10, 1):
    ws10.column_dimensions[get_column_letter(i)].width = w

# ==================== 工作表11：薪资达成追踪 ====================
ws11 = wb.create_sheet("薪资达成追踪")

ws11.merge_cells('A1:G1')
ws11['A1'] = '🎯 90天学习后薪资达成追踪'
ws11['A1'].font = title_font
ws11['A1'].alignment = Alignment(horizontal='center', vertical='center')

# 说明
ws11.merge_cells('A2:G2')
ws11['A2'] = '目标：3个月后找到AI电商运营岗位，月薪 RM 5,500-8,000'
ws11['A2'].font = Font(name='微软雅黑', size=11, bold=True, color='C00000')
ws11['A2'].alignment = Alignment(horizontal='center')

headers11 = ['时间节点', '能力水平', '可求职岗位', '薪资范围(RM)', 'offer数量', '最终薪资', '达成状态']
for col, header in enumerate(headers11, 1):
    cell = ws11.cell(row=4, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = thin_border

salary_track = [
    ('第1月结束', '入门水平', '运营助理/实习生', '2,000-3,500', 0, '', '未开始'),
    ('第6周结束', '初级水平', '运营专员', '3,500-5,000', 0, '', '未开始'),
    ('第2月结束', '中级水平', '中级运营/AI专员', '5,000-7,000', 0, '', '未开始'),
    ('第12周', '中高级水平', 'AI电商运营', '5,500-8,000', 0, '', '进行中'),
    ('第14周', '目标达成', 'AI运营专员/高级专员', '5,500-8,000', 0, '', '未完成'),
]

for row_num, data in enumerate(salary_track, 5):
    for col, value in enumerate(data, 1):
        cell = ws11.cell(row=row_num, column=col, value=value)
        cell.font = normal_font
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border
        
        if col == 7:
            cell.fill = pending_fill if value == '未完成' else (in_progress_fill if value == '进行中' else complete_fill)

# 薪资计算器
ws11['A12'] = '💰 薪资计算器：你的目标薪资 ='
ws11['A12'].font = Font(name='微软雅黑', size=11, bold=True)
ws11['A13'] = '基础薪资(RM 4,000-6,000) + AI能力溢价(20-30%) + 绩效奖金 + 提成'
ws11['A14'] = '示例：RM 5,000 × 1.25(AI溢价) + RM 500(绩效) + RM 500(提成) = RM 7,250/月'
ws11['A14'].font = Font(name='微软雅黑', size=10, italic=True, color='C00000')

widths11 = [14, 18, 22, 18, 12, 14, 12]
for i, w in enumerate(widths11, 1):
    ws11.column_dimensions[get_column_letter(i)].width = w

# 保存文件
output_path = '/Users/heguohua/low-coding/TikTok跨境电商90天学习计划+薪资指南.xlsx'
wb.save(output_path)
print(f'Excel文件已生成: {output_path}')
