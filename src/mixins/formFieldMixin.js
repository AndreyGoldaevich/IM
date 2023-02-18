import BaseFormField from "@/components/BaseFormField";
export default {
    name: "BaseFormText",
    components: {BaseFormField},
    props: ['title', 'error', 'placeholder'],
    computed: {
        dataValue: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    }
}
