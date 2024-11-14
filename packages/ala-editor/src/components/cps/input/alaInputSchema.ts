export default interface AlaInputSchema {
    /**
     * 组件名称
     */
    componentName: string;
    /**
     * 组件标签名
     */
    label?: string;
    /**
     * 组件 placeholder
     */
    placeholder: string;
    /**
     * 表单字段名
     */
    fieldName: string
}

const alaInputBuilder = (fieldName: string, placeholder: string, label = ''): AlaInputSchema => {
    return {
        componentName: 'AlaInput',
        label: label,
        placeholder: placeholder,
        fieldName: fieldName
    }
}
