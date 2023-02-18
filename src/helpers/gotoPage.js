import eventBus from "@/eventBus";

export default function     gotoPage(PageName, pageParams) {
    eventBus.$emit('gotoPage', PageName, pageParams)
}
