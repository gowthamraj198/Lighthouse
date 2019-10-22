const Table = require('cli-table')
const chalk = require('chalk');
const fs = require('fs');

let decide_config = function (mode) {
  if (mode == 'desktop')
    return require('../../config/config-desktop.js')
  else
    return require('../../config/config-mobile.js')
}

let write_results_to_table = function (results) {
  let table = new Table({
    style: { head: ['yellow'] },
    head: ['Gatherers', 'Percent'],
    colWidths: [20, 10],
    colors: true
  })
  Object.keys(results).forEach(category => {
    table.push([category, Math.round(results[category] * 100) >= 90 ?
      chalk.green(Math.round(results[category] * 100)) :
      chalk.red(Math.round(results[category] * 100))])
  })
  console.log(table.toString())
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

let file_name = function (url, mode) {
  if (url == '/')
    filename = 'home'
  else
    filename = url
  return './reports/' + filename + '-' + mode + '.html'
}

let find_write_report = function (report_file, results) {
  fs.access(report_file, fs.F_OK, (err) => {
    if (err) {
      fs.writeFile(report_file, results, { flag: 'wx' }, function (err) {
        if (err) {
          return console.log(err);
        }
      });
      return
    }
    fs.writeFile(report_file, results, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  })
}

module.exports = {
  write_results_to_table: write_results_to_table,
  decide_config: decide_config,
  file_name: file_name,
  find_write_report: find_write_report
};