from openpyxl import Workbook, load_workbook
from openpyxl.styles import Font, PatternFill, Border, Side, Alignment
from openpyxl.utils import get_column_letter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "outputs" / "马来西亚TikTok居家日用品-MVP选品清单-20款.xlsx"

# Today's 20 non-kitchen household candidates. None of these repeat the prior workbook items.
today_products = [
    {
        "产品名": "壁挂肥皂盒带沥水",
        "英文名": "Wall Mounted Soap Holder",
        "类目": "浴室收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "2.65-10.00",
        "建议售价(RM)": "6.90-9.90",
        "趋势判断": "稳定需求型",
        "内容角度": "肥皂不积水、浴室整洁",
        "无货源适配度": "高",
        "风险等级": "低",
        "推荐等级": "优先测试",
        "去重标识": "wall-mounted-soap-holder",
        "建议标题": "Wall Mounted Soap Holder with Drain Tray for Bathroom",
        "商家/商品链接": "https://shopee.com.my/list/soap/holder",
        "备注": "低售后标准品。",
    },
    {
        "产品名": "牙刷收纳架",
        "英文名": "Toothbrush Holder",
        "类目": "浴室收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "0.50-19.90",
        "建议售价(RM)": "4.90-12.90",
        "趋势判断": "稳定需求型",
        "内容角度": "浴室台面整洁、牙具分类",
        "无货源适配度": "高",
        "风险等级": "低",
        "推荐等级": "优先测试",
        "去重标识": "toothbrush-holder",
        "建议标题": "Toothbrush Holder for Bathroom Counter Storage Organizer",
        "商家/商品链接": "https://shopee.com.my/list/toothbrush/holder",
        "备注": "极标准化，适合搭配浴室收纳系列。",
    },
    {
        "产品名": "电动牙刷收纳架",
        "英文名": "Electric Toothbrush Holder",
        "类目": "浴室收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "8.90-19.90",
        "建议售价(RM)": "12.90-18.90",
        "趋势判断": "稳定需求型",
        "内容角度": "电动牙刷整洁收纳、台面更清爽",
        "无货源适配度": "中高",
        "风险等级": "低",
        "推荐等级": "优先测试",
        "去重标识": "electric-toothbrush-holder",
        "建议标题": "Electric Toothbrush Holder Bathroom Counter Organizer",
        "商家/商品链接": "https://shopee.com.my/list/electric/toothbrush/holder",
        "备注": "适合做升级款或带充电位版本。",
    },
    {
        "产品名": "牙膏挤压器",
        "英文名": "Toothpaste Dispenser",
        "类目": "浴室收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "3.85-12.00",
        "建议售价(RM)": "6.90-9.90",
        "趋势判断": "稳定需求型",
        "内容角度": "挤压更方便、减少浪费",
        "无货源适配度": "高",
        "风险等级": "低",
        "推荐等级": "优先测试",
        "去重标识": "toothpaste-dispenser",
        "建议标题": "Toothpaste Dispenser Wall Mounted Bathroom Accessory",
        "商家/商品链接": "https://shopee.com.my/list/toothpaste/dispenser",
        "备注": "价格低、演示简单，适合补充型推送。",
    },
    {
        "产品名": "卫生纸架带置物台",
        "英文名": "Toilet Paper Holder with Shelf",
        "类目": "浴室收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "21.02-46.20",
        "建议售价(RM)": "29.90-39.90",
        "趋势判断": "稳定需求型",
        "内容角度": "浴室更整洁、手机可放置",
        "无货源适配度": "中高",
        "风险等级": "中",
        "推荐等级": "观察后可测",
        "去重标识": "toilet-paper-holder-shelf",
        "建议标题": "Toilet Paper Holder with Shelf No Drill Bathroom Organizer",
        "商家/商品链接": "https://shopee.com.my/list/toilet/paper/holder",
        "备注": "需要注意安装方式和材质差异。",
    },
    {
        "产品名": "浴室毛巾架",
        "英文名": "Towel Rack Wall Mounted",
        "类目": "浴室收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "11.36-23.48",
        "建议售价(RM)": "16.90-22.90",
        "趋势判断": "稳定需求型",
        "内容角度": "浴室毛巾收纳、墙面利用",
        "无货源适配度": "中高",
        "风险等级": "中",
        "推荐等级": "优先测试",
        "去重标识": "towel-rack-wall-mounted",
        "建议标题": "Wall Mounted Towel Rack for Bathroom Space Saving Storage",
        "商家/商品链接": "https://shopee.com.my/list/towel/rack",
        "备注": "比小件更有客单，但对材质要求更高。",
    },
    {
        "产品名": "独立式毛巾架",
        "英文名": "Towel Rack Stand",
        "类目": "浴室收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "35.53-59.00",
        "建议售价(RM)": "49.90-69.90",
        "趋势判断": "稳定需求型",
        "内容角度": "浴室升级、毛巾干湿分离",
        "无货源适配度": "中",
        "风险等级": "中",
        "推荐等级": "观察后可测",
        "去重标识": "towel-rack-stand",
        "建议标题": "Towel Rack Stand for Bathroom Drying and Storage",
        "商家/商品链接": "https://shopee.com.my/list/towel/rack/stand",
        "备注": "体积更大，适合后续做中客单测试。",
    },
    {
        "产品名": "墙面挂钩",
        "英文名": "Wall Hook",
        "类目": "家居挂收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "1.18-6.00",
        "建议售价(RM)": "4.90-7.90",
        "趋势判断": "稳定需求型",
        "内容角度": "挂包、挂钥匙、挂小物",
        "无货源适配度": "高",
        "风险等级": "低",
        "推荐等级": "优先测试",
        "去重标识": "wall-hook",
        "建议标题": "Wall Hook for Home Storage and Daily Hanging Use",
        "商家/商品链接": "https://shopee.com.my/list/wall/hook",
        "备注": "极高标准品，适合做铺量和搭售。",
    },
    {
        "产品名": "马桶刷架",
        "英文名": "Toilet Brush Holder",
        "类目": "浴室清洁",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "9.78-36.50",
        "建议售价(RM)": "14.90-29.90",
        "趋势判断": "稳定需求型",
        "内容角度": "浴室卫生、清洁工具收纳",
        "无货源适配度": "中高",
        "风险等级": "中低",
        "推荐等级": "优先测试",
        "去重标识": "toilet-brush-holder",
        "建议标题": "Toilet Brush Holder Bathroom Cleaning Storage Tool",
        "商家/商品链接": "https://shopee.com.my/list/toilet/brush/holder",
        "备注": "有固定场景，但注意材质和耐用性。",
    },
    {
        "产品名": "鞋架",
        "英文名": "Shoe Rack",
        "类目": "鞋类收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "6.30-16.00",
        "建议售价(RM)": "9.90-14.90",
        "趋势判断": "稳定需求型",
        "内容角度": "鞋子整齐摆放、小空间利用",
        "无货源适配度": "中高",
        "风险等级": "中",
        "推荐等级": "观察后可测",
        "去重标识": "shoe-rack",
        "建议标题": "Shoe Rack for Home Entryway Space Saving Storage",
        "商家/商品链接": "https://shopee.com.my/list/shoe/rack",
        "备注": "体积和材质决定利润，适合标准款测试。",
    },
    {
        "产品名": "鞋柜式鞋架",
        "英文名": "Shoe Rack Cabinet",
        "类目": "鞋类收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "6.31-30.00",
        "建议售价(RM)": "19.90-39.90",
        "趋势判断": "稳定需求型",
        "内容角度": "玄关整洁、鞋子隐藏收纳",
        "无货源适配度": "中",
        "风险等级": "中",
        "推荐等级": "观察后可测",
        "去重标识": "shoe-rack-cabinet",
        "建议标题": "Shoe Rack Cabinet for Home Entryway Storage",
        "商家/商品链接": "https://shopee.com.my/list/shoe/rack/cabinet",
        "备注": "体积更大，履约和退货风险更高。",
    },
    {
        "产品名": "折叠脏衣篮",
        "英文名": "Foldable Laundry Basket",
        "类目": "家居收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "5.31-16.73",
        "建议售价(RM)": "9.90-14.90",
        "趋势判断": "稳定需求型",
        "内容角度": "脏衣整理、小户型收纳",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "优先测试",
        "去重标识": "foldable-laundry-basket",
        "建议标题": "Foldable Laundry Basket for Bedroom Bathroom Storage",
        "商家/商品链接": "https://shopee.com.my/list/laundry/basket",
        "备注": "需求普遍，适合家庭场景演示。",
    },
    {
        "产品名": "带盖脏衣篮",
        "英文名": "Laundry Basket with Lid",
        "类目": "家居收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "12.01-28.00",
        "建议售价(RM)": "19.90-29.90",
        "趋势判断": "稳定需求型",
        "内容角度": "遮挡杂乱、卧室更整洁",
        "无货源适配度": "中",
        "风险等级": "中",
        "推荐等级": "观察后可测",
        "去重标识": "laundry-basket-with-lid",
        "建议标题": "Laundry Basket with Lid for Home Bedroom Bathroom Storage",
        "商家/商品链接": "https://shopee.com.my/list/laundry/basket/lid",
        "备注": "体积较大，适合中客单测试。",
    },
    {
        "产品名": "衣柜收纳挂袋",
        "英文名": "Wardrobe Organizer",
        "类目": "衣柜收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "9.99-24.90",
        "建议售价(RM)": "14.90-22.90",
        "趋势判断": "稳定需求型",
        "内容角度": "衣柜分层整理、小空间利用",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "优先测试",
        "去重标识": "wardrobe-organizer",
        "建议标题": "Wardrobe Organizer for Clothes Storage and Space Saving",
        "商家/商品链接": "https://shopee.com.my/list/wardrobe/organizer",
        "备注": "避开厨房词后，衣柜场景很适合日常推送。",
    },
    {
        "产品名": "折叠衣物收纳盒",
        "英文名": "Foldable Clothes Storage Box",
        "类目": "衣物收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "3.25-19.90",
        "建议售价(RM)": "9.90-16.90",
        "趋势判断": "稳定需求型",
        "内容角度": "衣物分类、小空间整理",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "优先测试",
        "去重标识": "foldable-clothes-storage-box",
        "建议标题": "Foldable Clothes Storage Box for Closet and Bedroom Organizer",
        "商家/商品链接": "https://shopee.com.my/list/foldable/clothes/storage/box",
        "备注": "标准化较高，适合作为收纳系列补充款。",
    },
    {
        "产品名": "床底收纳箱",
        "英文名": "Under Bed Storage Box",
        "类目": "卧室收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "31.92-46.48",
        "建议售价(RM)": "39.90-59.90",
        "趋势判断": "稳定需求型",
        "内容角度": "隐藏收纳、换季衣物整理",
        "无货源适配度": "中",
        "风险等级": "中",
        "推荐等级": "观察后可测",
        "去重标识": "under-bed-storage-box",
        "建议标题": "Under Bed Storage Box for Clothes Blanket Space Saving",
        "商家/商品链接": "https://shopee.com.my/list/under/bed/storage/box",
        "备注": "体积偏大，适合后续做中客单。",
    },
    {
        "产品名": "包包挂钩",
        "英文名": "Bag Hook",
        "类目": "家居挂收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "0.99-6.00",
        "建议售价(RM)": "4.90-7.90",
        "趋势判断": "稳定需求型",
        "内容角度": "包包钥匙挂放、桌边整理",
        "无货源适配度": "高",
        "风险等级": "低",
        "推荐等级": "优先测试",
        "去重标识": "bag-hook",
        "建议标题": "Bag Hook for Home Storage and Daily Use",
        "商家/商品链接": "https://shopee.com.my/list/bag/hook",
        "备注": "极简标准品，适合作为低价搭售。",
    },
    {
        "产品名": "围巾挂架",
        "英文名": "Scarf Hanger Holder",
        "类目": "衣物收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "5.97-18.00",
        "建议售价(RM)": "9.90-14.90",
        "趋势判断": "稳定需求型",
        "内容角度": "围巾配饰整理、衣柜更整洁",
        "无货源适配度": "高",
        "风险等级": "低",
        "推荐等级": "优先测试",
        "去重标识": "scarf-hanger-holder",
        "建议标题": "Scarf Hanger Holder for Wardrobe Accessory Storage",
        "商家/商品链接": "https://shopee.com.my/list/scarf/hanger",
        "备注": "适合搭配衣柜和卧室收纳场景。",
    },
    {
        "产品名": "伸缩晾衣架",
        "英文名": "Clothes Hanging Rack",
        "类目": "晾晒收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "13.90-49.90",
        "建议售价(RM)": "24.90-39.90",
        "趋势判断": "稳定需求型",
        "内容角度": "晾晒空间优化、阳台整洁",
        "无货源适配度": "中",
        "风险等级": "中",
        "推荐等级": "观察后可测",
        "去重标识": "clothes-hanging-rack",
        "建议标题": "Clothes Hanging Rack for Balcony and Bedroom Storage",
        "商家/商品链接": "https://shopee.com.my/list/clothes/hanging/rack",
        "备注": "体积偏大，适合中客单或本地履约。",
    },
    {
        "产品名": "床边挂篮",
        "英文名": "Bedside Hanging Basket",
        "类目": "卧室收纳",
        "来源平台": "Shopee Malaysia",
        "市场": "马来西亚",
        "对标价格(RM)": "9.50-19.90",
        "建议售价(RM)": "14.90-19.90",
        "趋势判断": "稳定需求型",
        "内容角度": "床边小物收纳、卧室更整洁",
        "无货源适配度": "高",
        "风险等级": "中低",
        "推荐等级": "优先测试",
        "去重标识": "bedside-hanging-basket",
        "建议标题": "Bedside Hanging Basket for Bedroom Storage Organizer",
        "商家/商品链接": "https://shopee.com.my/list/bedside/hanging/basket",
        "备注": "适合宿舍和小卧室场景。",
    },
]

history_rows = [
    ["2026-05-27", "免打孔拖把挂架", "mop-holder-wall-mounted", "已推送", "TikTok", "浴室/阳台收纳前后对比", "历史已推送"],
    ["2026-05-27", "缝隙清洁刷", "gap-cleaning-brush", "已推送", "TikTok", "污渍清洁前后对比", "历史已推送"],
    ["2026-05-27", "浴室免打孔转角架", "bathroom-corner-shelf", "已推送", "TikTok", "浴室整洁前后对比", "历史已推送"],
    ["2026-05-27", "抽屉分隔收纳盒", "drawer-organizer-box", "已推送", "TikTok", "抽屉整理", "历史已推送"],
    ["2026-05-27", "壁挂肥皂盒带沥水", "wall-mounted-soap-holder", "已推送", "TikTok", "肥皂不积水", "历史已推送"],
    ["2026-05-27", "桌面多格收纳盒", "desktop-storage-box", "已推送", "TikTok", "桌面整理", "历史已推送"],
    ["2026-05-27", "免打孔卷纸架带置物台", "toilet-paper-holder-shelf", "已推送", "TikTok", "浴室收纳", "历史已推送"],
    ["2026-05-27", "衣柜挂袋收纳器", "hanging-closet-organizer", "已推送", "TikTok", "衣柜整理", "历史已推送"],
    ["2026-05-27", "床底收纳袋", "under-bed-storage-bag", "已推送", "TikTok", "床底收纳", "历史已推送"],
    ["2026-05-27", "滚筒粘毛器", "lint-roller", "已推送", "TikTok", "去毛清洁", "历史已推送"],
    ["2026-05-28", "免打孔拖把挂架", "mop-holder-wall-mounted", "已推送", "TikTok", "重复示例", "历史种子"],
    ["2026-05-29", "缝隙清洁刷", "gap-cleaning-brush", "待推送", "TikTok", "重复示例", "历史种子"],
]

wb = Workbook()
today_ws = wb.active
today_ws.title = "今日推送20款"
history_ws = wb.create_sheet("历史推送表")
note_ws = wb.create_sheet("说明")

headers = [
    "今日推送顺序", "推送日期", "产品名", "英文名", "类目", "是否厨房", "来源平台", "市场",
    "对标价格(RM)", "建议售价(RM)", "趋势判断", "内容角度", "无货源适配度",
    "风险等级", "推荐等级", "去重标识", "是否与历史重复", "建议标题",
    "商家/商品链接", "备注", "推送状态"
]

today_ws.append(headers)
for idx, item in enumerate(today_products, start=1):
    row = [
        idx,
        "2026-05-28",
        item["产品名"],
        item["英文名"],
        item["类目"],
        "否",
        item["来源平台"],
        item["市场"],
        item["对标价格(RM)"],
        item["建议售价(RM)"],
        item["趋势判断"],
        item["内容角度"],
        item["无货源适配度"],
        item["风险等级"],
        item["推荐等级"],
        item["去重标识"],
        f'=IF(COUNTIF(\'历史推送表\'!$C:$C,O{idx+1})>0,"重复","不重复")',
        item["建议标题"],
        item["商家/商品链接"],
        item["备注"],
        "待推送",
    ]
    today_ws.append(row)

history_headers = ["日期", "产品名", "去重标识", "是否已推送", "推送渠道", "内容方向", "备注"]
history_ws.append(history_headers)
for row in history_rows:
    history_ws.append(row)

note_ws["A1"] = "说明"
note_ws["A1"].font = Font(bold=True, size=14)
note_ws["A3"] = "本文件用于马来西亚 TikTok 居家日用品的每日推送，要求："
note_ws["A4"] = "1. 只保留非厨房产品"
note_ws["A5"] = "2. 每日推送 20 个产品"
note_ws["A6"] = "3. 通过历史推送表和去重标识避免重复"
note_ws["A7"] = "4. 今日推送表中“是否与历史重复”为公式结果"
note_ws["A8"] = "5. 若历史推送表继续新增记录，公式会自动识别"
note_ws.column_dimensions["A"].width = 72

header_fill = PatternFill("solid", fgColor="1F4E78")
header_font = Font(color="FFFFFF", bold=True)
thin = Side(style="thin", color="D9D9D9")
border = Border(left=thin, right=thin, top=thin, bottom=thin)

def style_sheet(ws):
    for cell in ws[1]:
        cell.fill = header_fill
        cell.font = header_font
        cell.border = border
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    for row in ws.iter_rows(min_row=2):
        for cell in row:
            cell.border = border
            cell.alignment = Alignment(vertical="top", wrap_text=True)

style_sheet(today_ws)
style_sheet(history_ws)

for col, width in {
    "A": 10, "B": 14, "C": 18, "D": 24, "E": 16, "F": 10, "G": 16, "H": 12, "I": 14,
    "J": 14, "K": 14, "L": 24, "M": 12, "N": 10, "O": 12, "P": 24, "Q": 12,
    "R": 44, "S": 60, "T": 26, "U": 12
}.items():
    today_ws.column_dimensions[col].width = width

for col, width in {
    "A": 14, "B": 18, "C": 24, "D": 12, "E": 12, "F": 24, "G": 28
}.items():
    history_ws.column_dimensions[col].width = width

today_ws.freeze_panes = "A2"
history_ws.freeze_panes = "A2"
today_ws.auto_filter.ref = f"A1:{get_column_letter(today_ws.max_column)}{today_ws.max_row}"
history_ws.auto_filter.ref = f"A1:{get_column_letter(history_ws.max_column)}{history_ws.max_row}"

for row_idx in range(2, today_ws.max_row + 1):
    rec = today_ws[f"N{row_idx}"].value
    fill = PatternFill("solid", fgColor="E2F0D9") if rec == "优先测试" else PatternFill("solid", fgColor="FFF2CC")
    for col_idx in range(1, today_ws.max_column + 1):
        today_ws.cell(row=row_idx, column=col_idx).fill = fill

for row_idx in range(2, history_ws.max_row + 1):
    for col_idx in range(1, history_ws.max_column + 1):
        history_ws.cell(row=row_idx, column=col_idx).fill = PatternFill("solid", fgColor="F3F3F3")

wb.save(OUTPUT_PATH)
print(OUTPUT_PATH)
