const express = require('express')
const app = express()
const port = 4000
var Excel = require('exceljs');
var expect = require('expect');
var fs = require('fs');




getNewWorkBook = () => {

    var workbook = new Excel.Workbook();
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);
    workbook.views = [
        {
            x: 0, y: 0, width: 10000, height: 20000,
            firstSheet: 0, activeTab: 1, visibility: 'visible'
        }
    ]

    var sheet1 = workbook.addWorksheet('My Sheet');
    // create a sheet with red tab colour
    var sheet2 = workbook.addWorksheet('My Sheet2', { properties: { tabColor: { argb: 'FFC0000' } } });

    // create a sheet where the grid lines are hidden
    var sheet3 = workbook.addWorksheet('My Sheet3', { properties: { showGridLines: false } });

    // create a sheet with the first row and column frozen
    var sheet4 = workbook.addWorksheet('My Sheet4', { views: [{ xSplit: 1, ySplit: 1 }] });
    // Add column headers and define column keys and widths
    // Note: these column structures are a workbook-building convenience only,
    // apart from the column width, they will not be fully persisted.
    sheet1.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'DOB', width: 10 }
    ];

    // Access an individual columns by key, letter and 1-based column number
    var idCol = sheet1.getColumn('id');
    var nameCol = sheet1.getColumn('B');
    var dobCol = sheet1.getColumn(3);

    // set column properties

    // Note: will overwrite cell value C1
    dobCol.header = 'Date of Birth';

    // Note: this will overwrite cell values C1:C2
    dobCol.header = ['Date of Birth', 'A.K.A. D.O.B.'];

    // from this point on, this column will be indexed by 'dob' and not 'DOB'
    dobCol.key = 'dob';

    // dobCol.width = 15;

    // Hide the column if you'd like
    // dobCol.hidden = true;

    // set an outline level for columns
    // sheet1.getColumn(4).outlineLevel = 0;
    // sheet1.getColumn(5).outlineLevel = 1;

    // // columns support a readonly field to indicate the collapsed state based on outlineLevel
    // expect(sheet1.getColumn(4).collapsed).toEqual(false);
    // expect(sheet1.getColumn(5).collapsed).toEqual(true);

    // // iterate over all current cells in this column
    // dobCol.eachCell(function (cell, rowNumber) {
    //     // ...
    // });

    // // iterate over all current cells in this column including empty cells
    // dobCol.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
    //     // ...
    // });

    // // add a column of new values
    // sheet1.getColumn(6).values = [1, 2, 3, 4, 5];

    // // add a sparse column of values
    // sheet1.getColumn(7).values = [, , 2, 3, , 5, , 7, , , , 11];

    // // cut one or more columns (columns to the right are shifted left)
    // // If column properties have been definde, they will be cut or moved accordingly
    // // Known Issue: If a splice causes any merged cells to move, the results may be unpredictable
    // sheet1.spliceColumns(3, 2);

    // // remove one column and insert two more.
    // // Note: columns 4 and above will be shifted right by 1 column.
    // // Also: If the worksheet has more rows than values in the colulmn inserts,
    // //  the rows will still be shifted as if the values existed
    // var newCol3Values = [1, 2, 3, 4, 5];
    // var newCol4Values = ['one', 'two', 'three', 'four', 'five'];
    // sheet1.spliceColumns(3, 1, newCol3Values, newCol4Values);
    // merge a range of cells
    sheet2.mergeCells('A4:B5');

    // ... merged cells are linked
    sheet2.getCell('B5').value = 'Hello, World!';
    expect(sheet2.getCell('B5').value).toBe(sheet2.getCell('A4').value);
    expect(sheet2.getCell('B5').master).toBe(sheet2.getCell('A4'));

    // ... merged cells share the same style object
    expect(sheet2.getCell('B5').style).toBe(sheet2.getCell('A4').style);
    // sheet2.getCell('B5').style.font = myFonts.arial;
    // expect(sheet2.getCell('A4').style.font).toBe(myFonts.arial);

    // unmerging the cells breaks the style links
    sheet2.unMergeCells('A4');
    expect(sheet2.getCell('B5').style).not.toBe(sheet2.getCell('A4').style);
    // expect(sheet2.getCell('B5').style.font).not.toBe(myFonts.arial);

    // merge by top-left, bottom-right
    sheet2.mergeCells('G10', 'H11');
    sheet2.mergeCells(10, 11, 12, 13); // top,left,bottom,right
    sheet2.getCell('A1').dataValidation = {
        type: 'whole',
        operator: 'notEqual',
        showErrorMessage: true,
        formulae: [5],
        errorStyle: 'error',
        errorTitle: 'Five',
        error: 'The value must not be Five'
    };
    // assign a style to a cell

    // var imageId2 = workbook.addImage({
    //     buffer: fs.readFileSync('https://homepages.cae.wisc.edu/~ece533/images/airplane.png'),
    //     extension: 'png',
    // });


    return workbook
}


app.get('/', (req, res) => {
    var fileName = 'Workbook.xlsx';

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
    let workbook = getNewWorkBook();
    workbook.xlsx.write(res).then(function () {
        res.end();
    });
    // res.send("aa")
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))