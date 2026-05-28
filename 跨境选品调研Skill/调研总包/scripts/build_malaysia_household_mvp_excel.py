from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Border, Side, Alignment
from openpyxl.utils import get_column_letter
from pathlib import Path


products = [
    {
        "产品名": "水槽滤网收纳篮",
        "英文名": "Sink Strainer Basket",
        "类目": "厨房清洁/收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "3.59-4.26",
        "建议售价(RM)": "5.90-8.90",
        "趋势判断": "稳定需求型",
        "内容角度": "水槽脏乱前后对比、残渣过滤、厨房整洁",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "优先测试",
        "建议标题": "Kitchen Sink Strainer Basket for Food Waste Filter and Storage",
        "商家/商品链接": "https://shopee.com.my/Sink-Strainer-Basket-Sink-Food-Catcher-Hanging-Kitchen-Sink-Strainer-Basket-Food-Fruit-Vegetable-Drain-Shelf-Sink-Storage-Holder-Kitchen-Essentials-Hanging-Easy-to-Install-i.72126484.40311849455",
        "备注": "真实商品页已验证；低价高同质化，需要靠材质或组合差异化。",
    },
    {
        "产品名": "免打孔拖把挂架",
        "英文名": "Wall Mounted Mop Holder",
        "类目": "清洁工具收纳",
        "来源平台": "Lazada Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "0.68-15.90",
        "建议售价(RM)": "6.90-12.90",
        "趋势判断": "稳定需求型",
        "内容角度": "收纳前后对比、浴室/厨房整洁",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "优先测试",
        "建议标题": "Wall Mounted Mop Holder No Drill Storage Rack for Bathroom",
        "商家/商品链接": "https://www.lazada.com.my/videodetail/?video_id=30045880169",
        "备注": "真实视频商品页已验证；承重和粘性是关键售后点。",
    },
    {
        "产品名": "缝隙清洁刷",
        "英文名": "Gap Cleaning Brush",
        "类目": "清洁工具",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "1.53-3.29",
        "建议售价(RM)": "4.90-8.90",
        "趋势判断": "稳定需求型",
        "内容角度": "角落污渍清洁前后对比、深度清洁",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "优先测试",
        "建议标题": "Gap Cleaning Brush for Bathroom Kitchen Corner Deep Cleaning",
        "商家/商品链接": "https://shopee.com.my/Deep-Clean-Scrub-Brushes-Window-Toilet-Ceramic-Tile-Gap-Cleaning-Brush-Scraper-With-Long-Handle-Corner-Groove-Crevice-Cleaning-Brush-For-Bathroom-And-Kitchen-Surface-Household-mol-i.252747406.23781140666",
        "备注": "真实商品页已验证；更适合用套装或刷头结构做差异化。",
    },
    {
        "产品名": "可折叠挂式垃圾桶",
        "英文名": "Foldable Hanging Trash Bin",
        "类目": "厨房日用品",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "6.95-13.29",
        "建议售价(RM)": "12.90-16.90",
        "趋势判断": "问题解决型",
        "内容角度": "做饭顺手清理厨余、节省弯腰动作",
        "无货源适配度": "中",
        "风险等级": "中",
        "推荐等级": "观察型",
        "建议标题": "Foldable Hanging Trash Bin for Kitchen Cabinet Easy Cleanup",
        "商家/商品链接": "https://shopee.com.my/Wall-mounted-Foldable-Trash-Can-Portable-Large-Size-Kitchen-Cupboard-Door-Garbage-Can-Folding-Hanging-Trash-Dustbin-i.41556508.5542614981",
        "备注": "真实商品页已验证；柜门适配、材质厚度、承重是核心风险。",
    },
    {
        "产品名": "冰箱分区收纳盒",
        "英文名": "Fridge Organizer Box",
        "类目": "厨房收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "2.43-22.90",
        "建议售价(RM)": "按规格分层",
        "趋势判断": "稳定需求型",
        "内容角度": "冰箱整理、食材分区、整洁视觉变化",
        "无货源适配度": "中",
        "风险等级": "中",
        "推荐等级": "观察型",
        "建议标题": "Fridge Organizer Box for Food Storage and Space Saving",
        "商家/商品链接": "https://shopee.com.my/list/fridge/container/organizer",
        "备注": "真实列表页已验证；需求稳定但尺寸/物流问题会压缩体验。",
    },
    {
        "产品名": "水槽海绵置物架",
        "英文名": "Sink Sponge Holder",
        "类目": "厨房收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "4.00-12.00",
        "建议售价(RM)": "7.90-11.90",
        "趋势判断": "稳定需求型",
        "内容角度": "水槽边整洁、海绵沥水收纳",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "优先测试",
        "建议标题": "Kitchen Sink Sponge Holder with Drain Tray for Easy Storage",
        "商家/商品链接": "https://shopee.com.my/list/sink/organizer",
        "备注": "基于马来西亚站点收纳场景验证；适合搭配水槽系列做组合。",
    },
    {
        "产品名": "水槽下收纳架",
        "英文名": "Under Sink Organizer",
        "类目": "厨房/浴室收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "18.00-49.00",
        "建议售价(RM)": "29.90-45.90",
        "趋势判断": "稳定需求型",
        "内容角度": "小空间利用、收纳前后对比",
        "无货源适配度": "中",
        "风险等级": "中",
        "推荐等级": "观察型",
        "建议标题": "Under Sink Organizer Rack for Kitchen and Bathroom Storage",
        "商家/商品链接": "https://shopee.com.my/list/under/sink/organizer",
        "备注": "适合整理类内容，但体积和组装复杂度会提高执行门槛。",
    },
    {
        "产品名": "旋转调料架",
        "英文名": "Rotating Spice Rack",
        "类目": "厨房收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "15.00-39.00",
        "建议售价(RM)": "24.90-36.90",
        "趋势判断": "稳定需求型",
        "内容角度": "台面整洁、拿取方便、厨房高级感",
        "无货源适配度": "中",
        "风险等级": "中",
        "推荐等级": "观察型",
        "建议标题": "Rotating Spice Rack for Kitchen Counter Space Saving Storage",
        "商家/商品链接": "https://shopee.com.my/list/spice/rack",
        "备注": "适合厨房收纳内容；玻璃材质或大体积版本需谨慎。",
    },
    {
        "产品名": "碗碟沥水架",
        "英文名": "Dish Drying Rack",
        "类目": "厨房收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "20.00-69.00",
        "建议售价(RM)": "32.90-59.90",
        "趋势判断": "稳定需求型",
        "内容角度": "台面整理、收纳前后对比、厨房升级",
        "无货源适配度": "中低",
        "风险等级": "中",
        "推荐等级": "观察型",
        "建议标题": "Dish Drying Rack for Kitchen Counter Storage and Organization",
        "商家/商品链接": "https://shopee.com.my/list/dish/drying/rack",
        "备注": "需求稳定，但体积和运输成本更高，不适合最轻量的测款。",
    },
    {
        "产品名": "浴室免打孔转角架",
        "英文名": "Bathroom Corner Shelf",
        "类目": "浴室收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "8.00-24.00",
        "建议售价(RM)": "12.90-22.90",
        "趋势判断": "稳定需求型",
        "内容角度": "浴室杂乱整理、空间优化",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "优先测试",
        "建议标题": "Bathroom Corner Shelf No Drill Storage Rack for Shower",
        "商家/商品链接": "https://shopee.com.my/list/bathroom/corner/shelf",
        "备注": "免打孔收纳是马来西亚居家场景里的常规高频需求。",
    },
    {
        "产品名": "多层收纳推车",
        "英文名": "Storage Trolley",
        "类目": "家居收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "25.00-79.00",
        "建议售价(RM)": "39.90-69.90",
        "趋势判断": "稳定需求型",
        "内容角度": "小空间分层收纳、厨房浴室通用",
        "无货源适配度": "中低",
        "风险等级": "中",
        "推荐等级": "观察型",
        "建议标题": "Slim Storage Trolley for Kitchen Bathroom Small Space Organizer",
        "商家/商品链接": "https://shopee.com.my/list/storage/trolley",
        "备注": "内容表现不错，但体积和组装件会提高履约复杂度。",
    },
    {
        "产品名": "抽屉分隔收纳盒",
        "英文名": "Drawer Organizer",
        "类目": "家居收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "5.00-19.00",
        "建议售价(RM)": "9.90-16.90",
        "趋势判断": "稳定需求型",
        "内容角度": "桌面/抽屉整理、分类收纳",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "优先测试",
        "建议标题": "Drawer Organizer Box for Home Storage and Easy Sorting",
        "商家/商品链接": "https://shopee.com.my/list/drawer/organizer",
        "备注": "规格多但标准化高，适合做组合装和分类场景内容。",
    },
    {
        "产品名": "保鲜袋封口机",
        "英文名": "Mini Bag Sealer",
        "类目": "厨房小工具",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "6.00-18.00",
        "建议售价(RM)": "9.90-15.90",
        "趋势判断": "问题解决型",
        "内容角度": "零食防潮、封口前后效果、厨房便利",
        "无货源适配度": "中高",
        "风险等级": "中",
        "推荐等级": "优先测试",
        "建议标题": "Mini Bag Sealer for Kitchen Food Storage and Snack Sealing",
        "商家/商品链接": "https://shopee.com.my/list/bag/sealer",
        "备注": "演示性强，但电池款或发热稳定性需要验证。",
    },
    {
        "产品名": "保鲜盒米面杂粮储物箱",
        "英文名": "Rice Storage Container",
        "类目": "厨房收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "18.00-49.00",
        "建议售价(RM)": "29.90-42.90",
        "趋势判断": "稳定需求型",
        "内容角度": "防潮收纳、厨房整洁、透明可视化",
        "无货源适配度": "中",
        "风险等级": "中",
        "推荐等级": "观察型",
        "建议标题": "Rice Storage Container for Kitchen Food Organizer with Lid",
        "商家/商品链接": "https://shopee.com.my/list/rice/storage/container",
        "备注": "需求明确，但体积偏大，适合后续再测。",
    },
    {
        "产品名": "垃圾袋收纳架",
        "英文名": "Garbage Bag Holder Rack",
        "类目": "厨房收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "4.00-12.00",
        "建议售价(RM)": "7.90-11.90",
        "趋势判断": "稳定需求型",
        "内容角度": "台面整洁、卷袋抽取更顺手",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "观察型",
        "建议标题": "Garbage Bag Holder Rack for Kitchen Wall Storage Organizer",
        "商家/商品链接": "https://shopee.com.my/list/garbage/bag/holder",
        "备注": "适合厨房收纳体系化内容，但单点爆发力一般。",
    },
    {
        "产品名": "洗碗布沥水架带毛巾杆",
        "英文名": "Sink Organizer with Towel Bar",
        "类目": "厨房收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "8.00-22.00",
        "建议售价(RM)": "12.90-18.90",
        "趋势判断": "稳定需求型",
        "内容角度": "水槽边整洁、海绵抹布分区",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "优先测试",
        "建议标题": "Sink Organizer with Towel Bar for Kitchen Sponge Storage",
        "商家/商品链接": "https://shopee.com.my/list/sink/organizer",
        "备注": "水槽整理类可与滤网篮联动，适合做系列店铺。",
    },
    {
        "产品名": "壁挂肥皂盒带沥水",
        "英文名": "Wall Mounted Soap Holder",
        "类目": "浴室收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "3.00-10.00",
        "建议售价(RM)": "6.90-9.90",
        "趋势判断": "稳定需求型",
        "内容角度": "香皂不积水、浴室整洁",
        "无货源适配度": "高",
        "风险等级": "低",
        "推荐等级": "观察型",
        "建议标题": "Wall Mounted Soap Holder with Drain Tray for Bathroom",
        "商家/商品链接": "https://shopee.com.my/list/soap/holder",
        "备注": "低价标准品，适合作为补充款或搭售款。",
    },
    {
        "产品名": "桌面多格收纳盒",
        "英文名": "Desktop Storage Box",
        "类目": "家居收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "6.00-18.00",
        "建议售价(RM)": "9.90-15.90",
        "趋势判断": "稳定需求型",
        "内容角度": "桌面整理、文具/化妆品分类",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "观察型",
        "建议标题": "Desktop Storage Box for Home Office Makeup and Daily Organizer",
        "商家/商品链接": "https://shopee.com.my/list/desktop/storage/box",
        "备注": "需求面较广，但居家日用品里竞争也偏高。",
    },
    {
        "产品名": "锅盖砧板收纳架",
        "英文名": "Pot Lid Organizer Rack",
        "类目": "厨房收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "8.00-25.00",
        "建议售价(RM)": "12.90-19.90",
        "趋势判断": "稳定需求型",
        "内容角度": "锅盖直立收纳、橱柜整洁",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "优先测试",
        "建议标题": "Pot Lid Organizer Rack for Kitchen Cabinet Space Saving",
        "商家/商品链接": "https://shopee.com.my/list/pot/lid/organizer",
        "备注": "很适合做厨房整理类内容，结构标准化较高。",
    },
    {
        "产品名": "橱柜分层置物架",
        "英文名": "Cabinet Shelf Organizer",
        "类目": "厨房收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "10.00-28.00",
        "建议售价(RM)": "15.90-24.90",
        "趋势判断": "稳定需求型",
        "内容角度": "增加收纳层、节省空间、前后对比",
        "无货源适配度": "中高",
        "风险等级": "中",
        "推荐等级": "观察型",
        "建议标题": "Cabinet Shelf Organizer for Kitchen Counter and Cupboard Storage",
        "商家/商品链接": "https://shopee.com.my/list/cabinet/shelf/organizer",
        "备注": "收纳逻辑强，但尺寸适配和稳固性要看供应质量。",
    },
    {
        "产品名": "滚筒粘毛器",
        "英文名": "Lint Roller",
        "类目": "清洁工具",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "2.00-9.00",
        "建议售价(RM)": "4.90-8.90",
        "趋势判断": "稳定需求型",
        "内容角度": "衣物除毛、沙发清洁、宠物毛处理",
        "无货源适配度": "高",
        "风险等级": "低",
        "推荐等级": "观察型",
        "建议标题": "Lint Roller for Clothes Sofa and Pet Hair Cleaning",
        "商家/商品链接": "https://shopee.com.my/list/lint/roller",
        "备注": "标准化强，但内容爆点不如缝隙刷和厨房工具。",
    },
    {
        "产品名": "免打孔卷纸架带置物台",
        "英文名": "Toilet Paper Holder with Shelf",
        "类目": "浴室收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "8.00-22.00",
        "建议售价(RM)": "12.90-19.90",
        "趋势判断": "稳定需求型",
        "内容角度": "浴室整洁、手机可放置、免打孔安装",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "观察型",
        "建议标题": "Toilet Paper Holder with Shelf No Drill Bathroom Organizer",
        "商家/商品链接": "https://shopee.com.my/list/toilet/paper/holder/shelf",
        "备注": "功能点清晰，但爆点弱于厨房问题解决型产品。",
    },
]


ROOT = Path(__file__).resolve().parents[1]
output_path = ROOT / "outputs" / "马来西亚TikTok居家日用品-MVP选品清单-20款.xlsx"

wb = Workbook()
ws = wb.active
ws.title = "20款选品清单"

summary = wb.create_sheet("说明")
summary["A1"] = "文件说明"
summary["A1"].font = Font(bold=True, size=14)
summary["A3"] = "主题"
summary["B3"] = "马来西亚 TikTok 居家日用品 MVP 选品清单"
summary["A4"] = "产品数量"
summary["B4"] = len(products)
summary["A5"] = "适用模式"
summary["B5"] = "新手无货源 / 测款"
summary["A6"] = "来源逻辑"
summary["B6"] = "TikTok 家居趋势方向 + Shopee/Lazada/Temu 马来西亚商品验证"
summary["A7"] = "说明"
summary["B7"] = "对标价格为调研时可见价格带；建议售价为MVP阶段建议，不等于最终投放价。"
summary.column_dimensions["A"].width = 18
summary.column_dimensions["B"].width = 90

headers = list(products[0].keys())
ws.append(headers)
for item in products:
    ws.append([item[h] for h in headers])

header_fill = PatternFill("solid", fgColor="1F4E78")
header_font = Font(color="FFFFFF", bold=True)
thin = Side(style="thin", color="D9D9D9")
border = Border(left=thin, right=thin, top=thin, bottom=thin)

for cell in ws[1]:
    cell.fill = header_fill
    cell.font = header_font
    cell.border = border
    cell.alignment = Alignment(horizontal="center", vertical="center")

for row in ws.iter_rows(min_row=2):
    for cell in row:
        cell.border = border
        cell.alignment = Alignment(vertical="top", wrap_text=True)

widths = {
    "A": 18, "B": 28, "C": 16, "D": 18, "E": 12,
    "F": 14, "G": 14, "H": 14, "I": 30, "J": 12,
    "K": 10, "L": 12, "M": 55, "N": 75, "O": 38,
}
for col, width in widths.items():
    ws.column_dimensions[col].width = width

ws.freeze_panes = "A2"
ws.auto_filter.ref = f"A1:{get_column_letter(ws.max_column)}{ws.max_row}"

for row_idx in range(2, ws.max_row + 1):
    grade = ws[f"L{row_idx}"].value
    fill = None
    if grade == "优先测试":
        fill = PatternFill("solid", fgColor="E2F0D9")
    elif grade == "观察型":
        fill = PatternFill("solid", fgColor="FFF2CC")
    elif grade == "不建议优先进入":
        fill = PatternFill("solid", fgColor="F4CCCC")
    if fill:
        for col_idx in range(1, ws.max_column + 1):
            ws.cell(row=row_idx, column=col_idx).fill = fill

wb.save(output_path)
print(output_path)
