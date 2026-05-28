#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
飞书选品管理系统 - Excel生成器
"""

import csv
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.utils import get_column_letter

def create_workbook():
    wb = Workbook()
    
    # 移除默认sheet
    wb.remove(wb.active)
    
    # 创建工作表
    create_product_sheet(wb)
    create_sales_sheet(wb)
    create_purchase_sheet(wb)
    create_summary_sheet(wb)
    
    # 保存
    wb.save('/Users/heguohua/low-coding/飞书选品管理系统.xlsx')
    print("✅ Excel文件已生成: 飞书选品管理系统.xlsx")

def create_product_sheet(wb):
    ws = wb.create_sheet("产品库")
    
    # 表头样式
    header_fill = PatternFill(start_color="4472C4", end_color="4472C4", fill_type="solid")
    header_font = Font(bold=True, color="FFFFFF", size=11)
    
    # 边框
    thin_border = Border(
        left=Side(style='thin'),
        right=Side(style='thin'),
        top=Side(style='thin'),
        bottom=Side(style='thin')
    )
    
    # 列宽
    column_widths = [12, 28, 15, 35, 12, 10, 10, 10, 10, 10, 12, 12, 12, 10, 10, 12, 18, 25, 15]
    
    headers = [
        "SKU编号", "产品名称", "平台", "产品链接", "售价(RMB)", "成本价", 
        "重量(g)", "物流费", "平台佣金%", "利润", "利润率%", "月销量预估", 
        "月利润预估", "竞品数量", "竞争度", "趋势判断", "样品状态", "供应商", "备注"
    ]
    
    # 写入表头
    for col, header in enumerate(headers, 1):
        cell = ws.cell(row=1, column=col, value=header)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = Alignment(horizontal='center', vertical='center')
        cell.border = thin_border
        ws.column_dimensions[get_column_letter(col)].width = column_widths[col-1]
    
    # 产品数据
    products = [
        ["LJ-001", "激光雕刻情侣手链-光面", "TikTok Shop", "https://tiktok.com/lj-001", 30, 6.5, 25, 8, "6%", "", "", 150, "", 58, "高", "上升", "已确认", "广州鸿盛饰品", "主打款"],
        ["LJ-002", "激光雕刻情侣手链-磨砂", "TikTok Shop", "https://tiktok.com/lj-002", 35, 7.5, 28, 8, "6%", "", "", 120, "", 42, "中", "上升", "已确认", "深圳激光工坊", "次推款"],
        ["LJ-003", "不锈钢简约手链-扁形", "TikTok Shop", "https://tiktok.com/lj-003", 28, 5.5, 22, 8, "6%", "", "", 200, "", 65, "高", "平稳", "待采购", "义乌饰品批发", "待测试"],
        ["LJ-004", "钛钢情侣手链-镂空", "Shopee", "https://shopee.com/lj-004", 45, 10, 35, 10, "8%", "", "", 80, "", 28, "低", "上升", "已确认", "广州钛钢制品", "利润高"],
        ["LJ-005", "激光刻字手镯-开口", "Shopee", "https://shopee.com/lj-005", 52, 12, 40, 10, "8%", "", "", 60, "", 35, "中", "上升", "待采购", "-", "待开发"],
        ["LJ-006", "情侣项链-激光刻字", "TikTok Shop", "https://tiktok.com/lj-006", 38, 8, 30, 9, "6%", "", "", 100, "", 48, "中", "平稳", "已确认", "广州鸿盛饰品", "可搭配销售"],
        ["LJ-007", "定制姓名手链", "Lazada", "https://lazada.com/lj-007", 58, 15, 32, 10, "7%", "", "", 40, "", 22, "低", "上升", "样品中", "-", "高客单价"],
        ["LJ-008", "激光雕刻对戒-素圈", "TikTok Shop", "https://tiktok.com/lj-008", 42, 9, 28, 9, "6%", "", "", 90, "", 55, "高", "平稳", "待采购", "-", "可做情侣款"],
        ["LJ-009", "时尚手链-多层缠绕", "Shopee", "https://shopee.com/lj-009", 36, 7, 20, 8, "8%", "", "", 110, "", 38, "中", "上升", "已确认", "义乌时尚饰品", "爆款潜力"],
        ["LJ-010", "激光刻字吊坠项链", "TikTok Shop", "https://tiktok.com/lj-010", 33, 6.5, 18, 7, "6%", "", "", 130, "", 45, "中", "上升", "已确认", "广州鸿盛饰品", "出单稳定"],
    ]
    
    # 写入数据
    for row_idx, product in enumerate(products, 2):
        for col_idx, value in enumerate(product, 1):
            cell = ws.cell(row=row_idx, column=col_idx, value=value)
            cell.border = thin_border
            cell.alignment = Alignment(horizontal='center', vertical='center')
            
            # 数字格式
            if col_idx == 5 and isinstance(value, (int, float)):  # 售价
                cell.number_format = '¥#,##0'
            elif col_idx == 6 and isinstance(value, (int, float)):  # 成本
                cell.number_format = '¥#,##0.0'
            elif col_idx == 7 and isinstance(value, (int, float)):  # 重量
                cell.number_format = '0"g"'
            elif col_idx == 8 and isinstance(value, (int, float)):  # 物流
                cell.number_format = '¥#,##0'
            elif col_idx == 12 and isinstance(value, (int, float)):  # 月销量
                cell.number_format = '#,##0'
    
    # 添加公式计算利润和利润率
    for row in range(2, 12):
        # 利润公式
        ws.cell(row=row, column=10, value=f"=E{row}-F{row}-H{row}-(E{row}*I{row})")
        ws.cell(row=row, column=10).number_format = '¥#,##0.0'
        
        # 利润率公式
        ws.cell(row=row, column=11, value=f"=J{row}/E{row}")
        ws.cell(row=row, column=11).number_format = '0.0%'
        
        # 月利润公式
        ws.cell(row=row, column=13, value=f"=J{row}*L{row}")
        ws.cell(row=row, column=13).number_format = '¥#,##0'
    
    # 高亮待采购行
    yellow_fill = PatternFill(start_color="FFF2CC", end_color="FFF2CC", fill_type="solid")
    for row in range(2, 12):
        if ws.cell(row=row, column=17).value == "待采购":
            for col in range(1, 20):
                ws.cell(row=row, column=col).fill = yellow_fill
    
    ws.row_dimensions[1].height = 25

def create_sales_sheet(wb):
    ws = wb.create_sheet("销售追踪")
    
    header_fill = PatternFill(start_color="70AD47", end_color="70AD47", fill_type="solid")
    header_font = Font(bold=True, color="FFFFFF", size=11)
    thin_border = Border(
        left=Side(style='thin'), right=Side(style='thin'),
        top=Side(style='thin'), bottom=Side(style='thin')
    )
    
    headers = ["日期", "SKU编号", "产品名称", "销售额", "订单数", "转化率", "广告花费", "利润", "库存", "排名", "排名变化", "备注"]
    column_widths = [12, 12, 28, 12, 10, 10, 10, 10, 10, 8, 10, 20]
    
    for col, header in enumerate(headers, 1):
        cell = ws.cell(row=1, column=col, value=header)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = Alignment(horizontal='center', vertical='center')
        cell.border = thin_border
        ws.column_dimensions[get_column_letter(col)].width = column_widths[col-1]
    
    # 销售数据
    sales_data = [
        ["2026-04-01", "LJ-001", "激光雕刻情侣手链-光面", 780, 26, "8.5%", 50, "", 45, 1285, "+3", "周末小高峰"],
        ["2026-04-02", "LJ-001", "激光雕刻情侣手链-光面", 630, 21, "7.2%", 45, "", 42, 1284, "-1", ""],
        ["2026-04-03", "LJ-001", "激光雕刻情侣手链-光面", 900, 30, "9.1%", 60, "", 50, 1282, "+5", "视频爆了"],
        ["2026-04-04", "LJ-001", "激光雕刻情侣手链-光面", 840, 28, "8.8%", 55, "", 48, 1280, "+2", ""],
        ["2026-04-05", "LJ-001", "激光雕刻情侣手链-光面", 750, 25, "8.3%", 48, "", 46, 1279, "0", ""],
        ["2026-04-06", "LJ-002", "激光雕刻情侣手链-磨砂", 420, 14, "6.5%", 35, "", 30, 5890, "+10", "新上架推广"],
        ["2026-04-07", "LJ-002", "激光雕刻情侣手链-磨砂", 540, 18, "7.2%", 40, "", 35, 5885, "+5", "开始出单"],
        ["2026-04-08", "LJ-006", "激光刻字手镯-开口", 510, 17, "7.8%", 38, "", 28, 3420, "-2", "被跟卖"],
        ["2026-04-09", "LJ-009", "时尚手链-多层缠绕", 660, 22, "8.1%", 42, "", 38, 2156, "+8", "款式新颖"],
        ["2026-04-10", "LJ-010", "激光刻字吊坠项链", 450, 15, "7.5%", 36, "", 32, 1892, "0", "稳定出单"],
    ]
    
    for row_idx, data in enumerate(sales_data, 2):
        for col_idx, value in enumerate(data, 1):
            cell = ws.cell(row=row_idx, column=col_idx, value=value)
            cell.border = thin_border
            cell.alignment = Alignment(horizontal='center', vertical='center')
    
    # 添加利润公式（简化：销售额*0.45 - 广告花费）
    for row in range(2, 12):
        ws.cell(row=row, column=8, value=f"=D{row}*0.45-E{row}")
        ws.cell(row=row, column=8).number_format = '¥#,##0'
    
    ws.row_dimensions[1].height = 25

def create_purchase_sheet(wb):
    ws = wb.create_sheet("采购管理")
    
    header_fill = PatternFill(start_color="ED7D31", end_color="ED7D31", fill_type="solid")
    header_font = Font(bold=True, color="FFFFFF", size=11)
    thin_border = Border(
        left=Side(style='thin'), right=Side(style='thin'),
        top=Side(style='thin'), bottom=Side(style='thin')
    )
    
    headers = ["SKU编号", "产品名称", "供应商", "采购价", "备货量", "采购金额", "采购日期", "预计到货", "实际到货", "库存状态", "质检状态", "备注"]
    column_widths = [12, 28, 20, 10, 10, 12, 12, 12, 12, 12, 12, 20]
    
    for col, header in enumerate(headers, 1):
        cell = ws.cell(row=1, column=col, value=header)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = Alignment(horizontal='center', vertical='center')
        cell.border = thin_border
        ws.column_dimensions[get_column_letter(col)].width = column_widths[col-1]
    
    purchase_data = [
        ["LJ-001", "激光雕刻情侣手链-光面", "广州鸿盛饰品", 6.5, 200, "", "2026-04-05", "2026-04-08", "2026-04-07", "已入库", "合格", "利润13.7"],
        ["LJ-001", "激光雕刻情侣手链-光面", "广州鸿盛饰品", 6.5, 300, "", "2026-04-15", "2026-04-18", "", "在途", "待检", "第二批"],
        ["LJ-002", "激光雕刻情侣手链-磨砂", "深圳激光工坊", 7.5, 150, "", "2026-04-10", "2026-04-13", "2026-04-12", "已入库", "合格", "磨砂损耗略高"],
        ["LJ-003", "不锈钢简约手链-扁形", "义乌饰品批发", 5.5, 100, "", "", "2026-04-20", "", "待采购", "待检", "待选品确认"],
        ["LJ-004", "钛钢情侣手链-镂空", "广州钛钢制品", 10, 80, "", "2026-04-08", "2026-04-11", "2026-04-10", "已入库", "合格", "利润28.4"],
        ["LJ-006", "激光刻字手镯-开口", "广州鸿盛饰品", 8, 120, "", "2026-04-12", "2026-04-15", "2026-04-14", "已入库", "合格", "搭配款"],
        ["LJ-009", "时尚手链-多层缠绕", "义乌时尚饰品", 7, 100, "", "2026-04-14", "2026-04-17", "", "在途", "待检", "新供应商"],
        ["LJ-010", "激光刻字吊坠项链", "广州鸿盛饰品", 6.5, 180, "", "2026-04-16", "2026-04-19", "", "在途", "待检", "稳定出单款"],
    ]
    
    for row_idx, data in enumerate(purchase_data, 2):
        for col_idx, value in enumerate(data, 1):
            cell = ws.cell(row=row_idx, column=col_idx, value=value)
            cell.border = thin_border
            cell.alignment = Alignment(horizontal='center', vertical='center')
            if col_idx == 4:
                cell.number_format = '¥#,##0.0'
    
    # 采购金额公式
    for row in range(2, 10):
        ws.cell(row=row, column=6, value=f"=D{row}*E{row}")
        ws.cell(row=row, column=6).number_format = '¥#,##0'
    
    # 颜色标记库存状态
    green_fill = PatternFill(start_color="C6EFCE", end_color="C6EFCE", fill_type="solid")
    yellow_fill = PatternFill(start_color="FFEB9C", end_color="FFEB9C", fill_type="solid")
    for row in range(2, 10):
        status = ws.cell(row=row, column=10).value
        if status == "已入库":
            for col in range(1, 13):
                ws.cell(row=row, column=col).fill = green_fill
        elif status == "在途":
            for col in range(1, 13):
                ws.cell(row=row, column=col).fill = yellow_fill
    
    ws.row_dimensions[1].height = 25

def create_summary_sheet(wb):
    ws = wb.create_sheet("数据看板", 0)  # 放在第一个位置
    
    # 标题样式
    title_font = Font(bold=True, size=20, color="4472C4")
    header_font = Font(bold=True, size=14)
    value_font = Font(bold=True, size=24, color="70AD47")
    
    # 标题
    ws['A1'] = "📊 选品管理系统 - 数据看板"
    ws['A1'].font = title_font
    ws.merge_cells('A1:F1')
    
    # 关键指标
    metrics = [
        ("总产品数", "10", "个"),
        ("平均利润率", "51.8%", ""),
        ("预估月总利润", "¥21,590", ""),
        ("已确认样品", "6", "个"),
        ("待采购", "3", "个"),
        ("样品中", "1", "个"),
    ]
    
    row = 3
    for i, (name, value, unit) in enumerate(metrics):
        ws.cell(row=row, column=1, value=name).font = header_font
        ws.cell(row=row, column=2, value=value).font = value_font
        ws.cell(row=row, column=3, value=unit)
        row += 1
    
    # 产品利润排行
    row += 1
    ws.cell(row=row, column=1, value="产品利润排行").font = header_font
    row += 1
    
    rank_headers = ["排名", "SKU", "产品名称", "售价", "成本", "利润", "利润率", "月利润"]
    for col, header in enumerate(rank_headers, 1):
        cell = ws.cell(row=row, column=col, value=header)
        cell.font = Font(bold=True, color="FFFFFF")
        cell.fill = PatternFill(start_color="4472C4", end_color="4472C4", fill_type="solid")
        cell.alignment = Alignment(horizontal='center')
    
    rank_data = [
        (1, "LJ-009", "时尚手链-多层缠绕", "¥36", "¥7", "¥22.2", "61.7%", "¥2,442"),
        (2, "LJ-004", "钛钢情侣手链-镂空", "¥45", "¥10", "¥28.4", "63.1%", "¥2,272"),
        (3, "LJ-010", "激光刻字吊坠项链", "¥33", "¥6.5", "¥17.0", "51.5%", "¥2,210"),
        (4, "LJ-003", "不锈钢简约手链-扁形", "¥28", "¥5.5", "¥11.7", "41.8%", "¥2,340"),
        (5, "LJ-001", "激光雕刻情侣手链-光面", "¥30", "¥6.5", "¥13.7", "45.7%", "¥2,055"),
    ]
    
    thin_border = Border(
        left=Side(style='thin'), right=Side(style='thin'),
        top=Side(style='thin'), bottom=Side(style='thin')
    )
    
    for data_row in rank_data:
        row += 1
        for col, value in enumerate(data_row, 1):
            cell = ws.cell(row=row, column=col, value=value)
            cell.border = thin_border
            cell.alignment = Alignment(horizontal='center')
            if col == 1:  # 排名
                cell.fill = PatternFill(start_color="FFF2CC", end_color="FFF2CC", fill_type="solid")
    
    # 调整列宽
    ws.column_dimensions['A'].width = 20
    ws.column_dimensions['B'].width = 15
    ws.column_dimensions['C'].width = 30
    ws.column_dimensions['D'].width = 12
    ws.column_dimensions['E'].width = 12
    ws.column_dimensions['F'].width = 12
    ws.column_dimensions['G'].width = 12
    ws.column_dimensions['H'].width = 15
    
    # 使用说明
    row = row + 2
    ws.cell(row=row, column=1, value="📌 使用说明").font = Font(bold=True, size=12)
    row += 1
    instructions = [
        "1. 「产品库」：管理所有选品，黄色行为待采购产品",
        "2. 「销售追踪」：记录每日销售数据，分析趋势",
        "3. 「采购管理」：管理采购订单，绿色=已入库，黄色=在途",
        "4. 「数据看板」：总览关键数据指标",
        "5. 利润和利润率会自动计算，只需填写基础数据",
    ]
    for instruction in instructions:
        ws.cell(row=row, column=1, value=instruction)
        row += 1

if __name__ == "__main__":
    create_workbook()
