import Exportation, {IPageOptions} from "@/exports/Exportation";

class TableExport extends Exportation {
    buildHeader() {
        const company: any = {};
        const images = {
            logo: company.logo,
        };
        const header = [
            {
                image: "logo",
                style: "logo",
                fit: [100, 100],
            },
            {
                text: `${company.name}`,
                style: "header",
            },
            {
                columns: [
                    {
                        text: "",
                    },
                    {
                        text: "RNC: \u0020",
                        width: "auto",
                        bold: true,
                        style: "subheader",
                    },
                    {
                        width: "auto",
                        text: `${company.rnc || "N/D"} / \u0020`,
                        style: "subheader",
                    },
                    {
                        text: "Tel.: \u0020",
                        width: "auto",
                        bold: true,
                        style: "subheader",
                    },
                    {
                        width: "auto",
                        text: ` ${company.phone || "N/D"}`,
                        style: "subheader",
                    },
                    {
                        text: "",
                    },
                ],
            },
            {
                columns: [
                    {
                        text: "",
                    },
                    {
                        width: "auto",
                        text: `Email: \u0020`,
                        style: "subheader",
                        bold: true,
                    },
                    {
                        width: "auto",
                        text: `${company.email || "N/D"}`,
                        style: "subheader",
                    },
                    {
                        text: "",
                    },
                ],
            },
            {
                text: `${company.address || "N/D"}`,
                style: "subheader",
            },
            {
                text: "_".repeat(97),
                margin: [0, 2, 0, 10],
            },
        ];

        return {images, header};
    }

    async buildPdf(
        data: Array<any>,
        columns: Array<any>,
        options?: IPageOptions,
        title?: string
    ) {
        const {images, header} = this.buildHeader();
        const widths = columns.map((col) => col.options.width);
        const body = [
            columns.map((col: any) => col.label),
            ...data.map((d: any) => {
                return columns.map((col: Record<string, any>) => {
                    return {
                        text: col.format ? col.format(d[col.key],d) : d[col.key],
                        ...(col.formatOptions ? col.formatOptions(d[col.key],d) : col.options),
                    };
                });
            }),

        ];
        let dd = {
            header: () =>
                this.buildPageHeader(),
            footer: function (currentPage: any, pageCount: any) {
                return {
                    text: currentPage.toString() + " de " + pageCount,
                    alignment: "center",
                };
            },
            pageOrientation: "portrait",
            pageSize: "LETTER",
            ...options,
            images: images,
            content: [
                ...header,
                {
                    text: title || 'Documento PDF',
                    alignment: "center",
                    style: "header",

                },
                {
                    text: "_".repeat(97),
                    margin: [0, 2, 0, 10],
                },
                {
                    layout: "headerLineOnly",
                    table: {
                        widths: widths,
                        body: body,
                    },
                },
            ],

            styles: {
                header: {
                    fontSize: 20,
                    bold: true,
                    alignment: "center",
                    lineHeight: 1.1,
                },
                subheader: {
                    fontSize: 12,
                    bold: false,
                    alignment: "center",
                    lineHeight: 1.1,
                },
                logo: {
                    alignment: "center",
                },
            },
        };
        return dd;
    }

    exportFunctions() {
        return [
            {
                label: "Imprimir",
                severity: "contrast",
                icon: "ant-design:printer-outlined",
                command: async (data: any, exportables: Array<Record<any, any>>) => {
                    const pdf = await this.buildPdf(data, exportables);
                    await this.printPDF(pdf);
                },
            },
            {
                label: "Ver PDF",
                severity: "contrast",
                icon: "ant-design:file-pdf-outlined",
                command: async (data: any, exportables: Array<Record<any, any>>) => {
                    const pdf = await this.buildPdf(data, exportables);
                    await this.exportPDF(pdf);
                },
            },
            {
                severity: "contrast",
                icon: "ant-design:cloud-download-outlined",
                label: "Descargar",
                command: async (data: any, exportables: Array<Record<any, any>>) => {
                    const pdf = await this.buildPdf(data, exportables);
                    await this.downloadPDF(pdf);
                },
            },
        ];
    }
}

export default new TableExport();
