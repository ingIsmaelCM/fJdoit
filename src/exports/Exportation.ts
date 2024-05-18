import pdfMake from "pdfmake/build/pdfmake";
import useUserStore from "@/stores/userStore";
import moment from "moment-timezone";

pdfMake.fonts = {
    Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    },
};

export interface IPageOptions {
    pageSize?: number;
    paseOrientation?: string;
    pargeMargins?: number[];
}

export interface IExportable<T> {
    key: keyof T;
    label: string;
    options: IExportableOptions;
    format?(value: any, data: any): string | number;
    formatOptions?(value: any, data: any): IExportableOptions;
}

export interface IExportableOptions {
    width: number | string;
    bold?: boolean;
    fontSize?: number;
    alignment?: "right" | "left" | "center" | "justify";
    lineHeight?: number;
    italics?: boolean;
    characterSpacing?: number;
    color?: string;
    background?: string;
    markerColr?: string;
    decoration?: string | string[];
}

export default abstract class Exportation {
    abstract buildHeader(): Record<any, any>;
    public title="Encabezado del documento";
    abstract buildPdf(
        data: Array<any>,
        columns: Array<any>,
        options?: IPageOptions
    ): Record<any, any>;

    abstract exportFunctions(): Array<any>;

    buildPageHeader(): any {
        const userstore = useUserStore();
        const user = userstore.getUser;
        return [
            {
                columns: [
                    {
                        text: `Generada por: ${user.username}`,
                        alignment: "left",
                        margin: [20, 10],
                    },
                    {
                        text: moment().format("DD/MM/YYYY hh:mm A"),
                        alignment: "right",
                        margin: [20, 10],
                    },
                ],
            },
        ];
    }

    async exportPDF(pdf: any) {
        pdfMake.createPdf(pdf as any).open();
    }

    async printPDF(pdf: any) {
        pdfMake.createPdf(pdf as any).print();
    }

    async downloadPDF(pdf: any) {
        pdfMake.createPdf(pdf as any).download();
    }

    async getDataUrl(pdf: any) {
        const docPdf = pdfMake.createPdf(pdf as any);

        return new Promise((resolve: Function, reject: Function) => {
            try {
                docPdf.getDataUrl((dataUrl) => {
                    resolve(dataUrl)
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}
