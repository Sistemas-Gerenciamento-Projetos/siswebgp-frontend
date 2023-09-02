import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import translateStatus from './translateStatus';
import { parseDateWithoutTimezone } from './dateParse';

export default function pdfReport(projectName, epics, tasks) {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: `Relatório do projeto ${projectName}`,
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    },
  ];

  const dataTasks = tasks.map((task) => {
    const status = translateStatus(task.status);
    const deadlineDate = parseDateWithoutTimezone(
      task.deadline_date,
    ).toLocaleDateString('pt-BR', options);

    return [
      { text: task.title, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: status, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: deadlineDate, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: task.user_name, fontSize: 9, margin: [0, 2, 0, 2] },
    ];
  });

  const dataEpics = epics.map((epic) => {
    const status = translateStatus(epic.status);
    const deadlineDate = parseDateWithoutTimezone(
      epic.deadline_date,
    ).toLocaleDateString('pt-BR', options);

    return [
      { text: epic.title, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: status, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: deadlineDate, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: epic.user_name, fontSize: 9, margin: [0, 2, 0, 2] },
    ];
  });

  const details = [
    { text: 'Épicos', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
    {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*'],
        body: [
          [
            { text: 'Nome do épico', style: 'tableHeader', fontSize: 10 },
            { text: 'Status', style: 'tableHeader', fontSize: 10 },
            { text: 'Data de entrega', style: 'tableHeader', fontSize: 10 },
            { text: 'Responsável', style: 'tableHeader', fontSize: 10 },
          ],
          ...dataEpics,
        ],
      },
      layout: 'headerLineOnly',
    },
    { text: 'Tarefas', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
    {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*'],
        body: [
          [
            { text: 'Nome da tarefa', style: 'tableHeader', fontSize: 10 },
            { text: 'Status', style: 'tableHeader', fontSize: 10 },
            { text: 'Data de entrega', style: 'tableHeader', fontSize: 10 },
            { text: 'Responsável', style: 'tableHeader', fontSize: 10 },
          ],
          ...dataTasks,
        ],
      },
      layout: 'headerLineOnly',
    },
  ];

  const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],
    header: [reportTitle],
    content: [details],
  };

  pdfMake.createPdf(docDefinitions).download();
}
