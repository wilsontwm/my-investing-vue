<template>
    <v-sheet class="px-3 pt-3 pb-12">
        <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <v-boilerplate class="mb-6" type="image, article"></v-boilerplate>
            </v-col>

            <v-col cols="12" md="4">
                <v-boilerplate class="mb-6" type="table-heading, list-item-two-line, image, table-tfoot"></v-boilerplate>
            </v-col>

            <v-col cols="12" md="4">
                <v-boilerplate class="mb-6" type="list-item-avatar-three-line, image"></v-boilerplate>
            </v-col>
        </v-row>
        </v-container>
    </v-sheet>
</template>
<script>
export default {
    name: "NewsLoader",
    components: {
        VBoilerplate: {
            functional: true,

            render (h, { data, props, children }) {
                return h('v-skeleton-loader', {
                    ...data,
                    props: {
                    boilerplate: false,
                    elevation: 2,
                    ...props,
                    },
                }, children)
            },
        },
    }
}
</script>