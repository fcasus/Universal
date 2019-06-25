// Copyright [2019] [Banana.ch SA - Lugano Switzerland]
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// @id = ch.banana.uni.invoice.uni10
// @api = 1.0
// @pubdate = 2019-06-18
// @publisher = Banana.ch SA
// @description = Style 10: Fully customizable invoice template
// @description.it = Stile 10: Template fattura completamente personalizzabile
// @description.de = Stil 10: Fully customizable invoice template
// @description.fr = Style 10: Fully customizable invoice template
// @description.nl = Stijl 10: Fully customizable invoice template
// @description.en = Style 10: Fully customizable invoice template
// @description.zh = Style 10: Fully customizable invoice template
// @doctype = *
// @task = report.customer.invoice




/*
  SUMMARY
  =======
  New invoice template.

  Invoice zones:
  - header
  - info
  - address
  - shipping address
  - begin text (title and begin text)
  - details
  - final texts
  - footer

*/



// Counter for the columns of the Details table
var columnsNumber = 0;




//====================================================================//
// SETTINGS DIALOG FUNCTIONS USED TO SET, INITIALIZE AND VERIFY ALL
// THE PARAMETERS OF THE SETTINGS DIALOG
//====================================================================//

// Update script's parameters
function settingsDialog() {
  var userParam = initParam();
  var savedParam = Banana.document.getScriptSettings();
  if (savedParam.length > 0) {
    userParam = JSON.parse(savedParam);
  }   
  userParam = verifyParam(userParam);
  if (typeof (Banana.Ui.openPropertyEditor) !== 'undefined') {
    var dialogTitle = 'Settings';
    var convertedParam = convertParam(userParam);
    var pageAnchor = 'dlgSettings';
    if (!Banana.Ui.openPropertyEditor(dialogTitle, convertedParam, pageAnchor)) {
      return;
    }
    for (var i = 0; i < convertedParam.data.length; i++) {
      // Read values to param (through the readValue function)
      convertedParam.data[i].readValue();
    }
  }
  var paramToString = JSON.stringify(userParam);
  var value = Banana.document.setScriptSettings(paramToString);
}

function convertParam(userParam) {
  var lang = 'en';
  if (Banana.document.locale) {
    lang = Banana.document.locale;
  }
  if (lang.length > 2) {
    lang = lang.substr(0, 2);
  }
  var texts = setInvoiceTexts(lang);

  var convertedParam = {};
  convertedParam.version = '1.0';
  /* array of script's parameters */
  convertedParam.data = [];


  /*******************************************************************************************
  * INCLUDE
  *******************************************************************************************/
  var currentParam = {};
  currentParam.name = 'include';
  currentParam.title = texts.param_include;
  currentParam.type = 'string';
  currentParam.value = '';
  currentParam.editable = false;
  currentParam.readValue = function() {
    userParam.include = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'header_include';
  currentParam.parentObject = 'include';
  currentParam.title = texts.param_header_include;
  currentParam.type = 'string';
  currentParam.value = '';
  currentParam.editable = false;
  currentParam.readValue = function() {
    userParam.header_include = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'header_print';
  currentParam.parentObject = 'header_include';
  currentParam.title = texts.param_header_print;
  currentParam.type = 'bool';
  currentParam.value = userParam.header_print ? true : false;
  currentParam.defaultvalue = true;
  currentParam.tooltip = texts.param_tooltip_header_print;
  currentParam.readValue = function() {
    userParam.header_print = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'header_left';
  currentParam.parentObject = 'header_include';
  currentParam.title = texts.param_header_left;
  currentParam.type = 'bool';
  currentParam.value = userParam.header_left ? true : false;
  currentParam.defaultvalue = false;
  currentParam.tooltip = texts.param_tooltip_header_left;
  currentParam.readValue = function() {
    userParam.header_left = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'header_row_1';
  currentParam.parentObject = 'header_include';
  currentParam.title = texts.param_header_row_1;
  currentParam.type = 'string';
  currentParam.value = userParam.header_row_1 ? userParam.header_row_1 : '';
  currentParam.defaultvalue = "";
  currentParam.tooltip = texts.param_tooltip_header_row_1;
  currentParam.readValue = function() {
    userParam.header_row_1 = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'header_row_2';
  currentParam.parentObject = 'header_include';
  currentParam.title = texts.param_header_row_2;
  currentParam.type = 'string';
  currentParam.value = userParam.header_row_2 ? userParam.header_row_2 : '';
  currentParam.defaultvalue = "";
  currentParam.tooltip = texts.param_tooltip_header_row_2;
  currentParam.readValue = function() {
    userParam.header_row_2 = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'header_row_3';
  currentParam.parentObject = 'header_include';
  currentParam.title = texts.param_header_row_3;
  currentParam.type = 'string';
  currentParam.value = userParam.header_row_3 ? userParam.header_row_3 : '';
  currentParam.defaultvalue = "";
  currentParam.tooltip = texts.param_tooltip_header_row_3;
  currentParam.readValue = function() {
    userParam.header_row_3 = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'header_row_4';
  currentParam.parentObject = 'header_include';
  currentParam.title = texts.param_header_row_4;
  currentParam.type = 'string';
  currentParam.value = userParam.header_row_4 ? userParam.header_row_4 : '';
  currentParam.defaultvalue = "";
  currentParam.tooltip = texts.param_tooltip_header_row_4;
  currentParam.readValue = function() {
    userParam.header_row_4 = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'header_row_5';
  currentParam.parentObject = 'header_include';
  currentParam.title = texts.param_header_row_5;
  currentParam.type = 'string';
  currentParam.value = userParam.header_row_5 ? userParam.header_row_5 : '';
  currentParam.defaultvalue = "";
  currentParam.tooltip = texts.param_tooltip_header_row_5;
  currentParam.readValue = function() {
    userParam.header_row_5 = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'logo_print';
  currentParam.parentObject = 'header_include';
  currentParam.title = texts.param_logo_print;
  currentParam.type = 'bool';
  currentParam.value = userParam.logo_print ? true : false;
  currentParam.defaultvalue = false;
  currentParam.tooltip = texts.param_tooltip_logo_print;
  currentParam.readValue = function() {
    userParam.logo_print = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'logo_name';
  currentParam.parentObject = 'header_include';
  currentParam.title = texts.param_logo_name;
  currentParam.type = 'string';
  currentParam.value = userParam.logo_name ? userParam.logo_name : '';
  currentParam.defaultvalue = "Logo";
  currentParam.tooltip = texts.param_tooltip_logo_name;
  currentParam.readValue = function() {
    userParam.logo_name = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'address_include';
  currentParam.parentObject = 'include';
  currentParam.title = texts.param_address_include;
  currentParam.type = 'string';
  currentParam.value = '';
  currentParam.editable = false;
  currentParam.readValue = function() {
    userParam.address_include = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'address_small_line';
  currentParam.parentObject = 'address_include';
  currentParam.title = texts.param_address_small_line;
  currentParam.type = 'string';
  currentParam.value = userParam.address_small_line ? userParam.address_small_line : '';
  currentParam.defaultvalue = '<none>';
  currentParam.tooltip = texts.param_tooltip_address_small_line;
  currentParam.readValue = function() {
   userParam.address_small_line = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'address_left';
  currentParam.parentObject = 'address_include';
  currentParam.title = texts.param_address_left;
  currentParam.type = 'bool';
  currentParam.value = userParam.address_left ? true : false;
  currentParam.defaultvalue = false;
  currentParam.tooltip = texts.param_tooltip_address_left;
  currentParam.readValue = function() {
   userParam.address_left = this.value;
  }
  convertedParam.data.push(currentParam);
  
  currentParam = {};
  currentParam.name = 'shipping_address';
  currentParam.parentObject = 'address_include';
  currentParam.title = texts.param_shipping_address;
  currentParam.type = 'bool';
  currentParam.value = userParam.shipping_address ? true : false;
  currentParam.defaultvalue = false;
  currentParam.tooltip = texts.param_tooltip_shipping_address;
  currentParam.readValue = function() {
    userParam.shipping_address = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'info_include';
  currentParam.parentObject = 'include';
  currentParam.title = texts.param_info_include;
  currentParam.type = 'string';
  currentParam.value = '';
  currentParam.editable = false;
  currentParam.readValue = function() {
    userParam.info_include = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'info_invoice_number';
  currentParam.parentObject = 'info_include';
  currentParam.title = texts.param_info_invoice_number;
  currentParam.type = 'bool';
  currentParam.value = userParam.info_invoice_number ? true : false;
  currentParam.defaultvalue = true;
  currentParam.tooltip = texts.param_tooltip_info_invoice_number;
  currentParam.readValue = function() {
    userParam.info_invoice_number = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'info_date';
  currentParam.parentObject = 'info_include';
  currentParam.title = texts.param_info_date;
  currentParam.type = 'bool';
  currentParam.value = userParam.info_date ? true : false;
  currentParam.defaultvalue = true;
  currentParam.tooltip = texts.param_tooltip_info_date;
  currentParam.readValue = function() {
    userParam.info_date = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'info_customer';
  currentParam.parentObject = 'info_include';
  currentParam.title = texts.param_info_customer;
  currentParam.type = 'bool';
  currentParam.value = userParam.info_customer ? true : false;
  currentParam.defaultvalue = true;
  currentParam.tooltip = texts.param_tooltip_info_customer;
  currentParam.readValue = function() {
    userParam.info_customer = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'info_customer_vat_number';
  currentParam.parentObject = 'info_include';
  currentParam.title = texts.param_info_customer_vat_number;
  currentParam.type = 'bool';
  currentParam.value = userParam.info_customer_vat_number ? true : false;
  currentParam.defaultvalue = false;
  currentParam.tooltip = texts.param_tooltip_info_customer_vat_number;
  currentParam.readValue = function() {
    userParam.info_customer_vat_number = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'info_customer_fiscal_number';
  currentParam.parentObject = 'info_include';
  currentParam.title = texts.param_info_customer_fiscal_number;
  currentParam.type = 'bool';
  currentParam.value = userParam.info_customer_fiscal_number ? true : false;
  currentParam.defaultvalue = false;
  currentParam.tooltip = texts.param_tooltip_info_customer_fiscal_number;
  currentParam.readValue = function() {
    userParam.info_customer_fiscal_number = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'info_due_date';
  currentParam.parentObject = 'info_include';
  currentParam.title = texts.param_info_due_date;
  currentParam.type = 'bool';
  currentParam.value = userParam.info_due_date ? true : false;
  currentParam.defaultvalue = true;
  currentParam.tooltip = texts.param_tooltip_info_due_date;
  currentParam.readValue = function() {
    userParam.info_due_date = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'info_page';
  currentParam.parentObject = 'info_include';
  currentParam.title = texts.param_info_page;
  currentParam.type = 'bool';
  currentParam.value = userParam.info_page ? true : false;
  currentParam.defaultvalue = true;
  currentParam.tooltip = texts.param_tooltip_info_page;
  currentParam.readValue = function() {
    userParam.info_page = this.value;
  }
  convertedParam.data.push(currentParam);


  currentParam = {};
  currentParam.name = 'details_include';
  currentParam.parentObject = 'include';
  currentParam.title = texts.param_details_include;
  currentParam.type = 'string';
  currentParam.value = '';
  currentParam.editable = false;
  currentParam.readValue = function() {
    userParam.details_include = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'details_columns';
  currentParam.parentObject = 'details_include';
  currentParam.title = texts.param_details_columns;
  currentParam.type = 'string';
  currentParam.value = userParam.details_columns ? userParam.details_columns : '';
  currentParam.defaultvalue = texts.description+";"+texts.quantity+";"+texts.reference_unit+";"+texts.unit_price+";"+texts.amount;
  currentParam.tooltip = texts.param_tooltip_details_columns;
  currentParam.readValue = function() {
    userParam.details_columns = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'details_columns_widths';
  currentParam.parentObject = 'details_include';
  currentParam.title = texts.param_details_columns_widths;
  currentParam.type = 'string';
  currentParam.value = userParam.details_columns_widths ? userParam.details_columns_widths : '';
  currentParam.defaultvalue = '50%;10%;10%;15%;15%';
  currentParam.tooltip = texts.param_tooltip_details_columns_widths;
  currentParam.readValue = function() {
    userParam.details_columns_widths = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'details_gross_amounts';
  currentParam.parentObject = 'details_include';
  currentParam.title = texts.param_details_gross_amounts;
  currentParam.type = 'bool';
  currentParam.value = userParam.details_gross_amounts ? true : false;
  currentParam.defaultvalue = false;
  currentParam.tooltip = texts.param_tooltip_details_gross_amounts;
  currentParam.readValue = function() {
   userParam.details_gross_amounts = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'footer_include';
  currentParam.parentObject = 'include';
  currentParam.title = texts.param_footer_include;
  currentParam.type = 'string';
  currentParam.value = '';
  currentParam.editable = false;
  currentParam.readValue = function() {
    userParam.footer_include = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'footer_add';
  currentParam.parentObject = 'footer_include';
  currentParam.title = texts.param_footer_add;
  currentParam.type = 'bool';
  currentParam.value = userParam.footer_add ? true : false;
  currentParam.defaultvalue = false;
  currentParam.tooltip = texts.footer_add;
  currentParam.readValue = function() {
   userParam.footer_add = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'footer_left';
  currentParam.parentObject = 'footer_include';
  currentParam.title = texts.param_footer_left;
  currentParam.type = 'string';
  currentParam.value = userParam.footer_left ? userParam.footer_left : '';
  currentParam.defaultvalue = '';
  currentParam.tooltip = texts.param_tooltip_footer;
  currentParam.readValue = function() {
   userParam.footer_left = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'footer_center';
  currentParam.parentObject = 'footer_include';
  currentParam.title = texts.param_footer_center;
  currentParam.type = 'string';
  currentParam.value = userParam.footer_center ? userParam.footer_center : '';
  currentParam.defaultvalue = '';
  currentParam.tooltip = texts.param_tooltip_footer;
  currentParam.readValue = function() {
   userParam.footer_center = this.value;
  }
  convertedParam.data.push(currentParam); 

  currentParam = {};
  currentParam.name = 'footer_right';
  currentParam.parentObject = 'footer_include';
  currentParam.title = texts.param_footer_right;
  currentParam.type = 'string';
  currentParam.value = userParam.footer_right ? userParam.footer_right : '';
  currentParam.defaultvalue = texts.page+' &['+texts.page+']';
  currentParam.tooltip = texts.param_tooltip_footer;
  currentParam.readValue = function() {
   userParam.footer_right = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'qr_code';
  currentParam.parentObject = 'include';
  currentParam.title = texts.param_qr_code;
  currentParam.type = 'string';
  currentParam.value = '';
  currentParam.editable = false;
  currentParam.readValue = function() {
    userParam.qr_code = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'qr_code_add';
  currentParam.parentObject = 'qr_code';
  currentParam.title = texts.param_qr_code_add;
  currentParam.type = 'bool';
  currentParam.value = userParam.qr_code_add ? true : false;
  currentParam.defaultvalue = false;
  currentParam.tooltip = texts.param_tooltip_qr_code_add;
  currentParam.readValue = function() {
   userParam.qr_code_add = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'qr_code_align';
  currentParam.parentObject = 'qr_code';
  currentParam.title = texts.param_qr_code_align;
  currentParam.type = 'string';
  currentParam.value = userParam.qr_code_align ? userParam.qr_code_align : '';
  currentParam.defaultvalue = 'right';
  currentParam.tooltip = texts.param_tooltip_qr_code_align;
  currentParam.readValue = function() {
    userParam.qr_code_align = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'qr_code_use_different_address';
  currentParam.parentObject = 'qr_code';
  currentParam.title = texts.param_qr_code_use_different_address;
  currentParam.type = 'bool';
  currentParam.value = userParam.qr_code_use_different_address ? true : false;
  currentParam.defaultvalue = false;
  currentParam.tooltip = texts.param_tooltip_qr_code_use_different_address;
  currentParam.readValue = function() {
   userParam.qr_code_use_different_address = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'qr_code_address_row_1';
  currentParam.parentObject = 'qr_code';
  currentParam.title = texts.param_qr_code_address_row_1;
  currentParam.type = 'string';
  currentParam.value = userParam.qr_code_address_row_1 ? userParam.qr_code_address_row_1 : '';
  currentParam.defaultvalue = '';
  currentParam.tooltip = texts.param_tooltip_qr_code_address_row_1;
  currentParam.readValue = function() {
    userParam.qr_code_address_row_1 = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'qr_code_address_row_2';
  currentParam.parentObject = 'qr_code';
  currentParam.title = texts.param_qr_code_address_row_2;
  currentParam.type = 'string';
  currentParam.value = userParam.qr_code_address_row_2 ? userParam.qr_code_address_row_2 : '';
  currentParam.defaultvalue = '';
  currentParam.tooltip = texts.param_tooltip_qr_code_address_row_2;
  currentParam.readValue = function() {
    userParam.qr_code_address_row_2 = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'qr_code_address_row_3';
  currentParam.parentObject = 'qr_code';
  currentParam.title = texts.param_qr_code_address_row_3;
  currentParam.type = 'string';
  currentParam.value = userParam.qr_code_address_row_3 ? userParam.qr_code_address_row_3 : '';
  currentParam.defaultvalue = '';
  currentParam.tooltip = texts.param_tooltip_qr_code_address_row_3;
  currentParam.readValue = function() {
    userParam.qr_code_address_row_3 = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'qr_code_address_row_4';
  currentParam.parentObject = 'qr_code';
  currentParam.title = texts.param_qr_code_address_row_4;
  currentParam.type = 'string';
  currentParam.value = userParam.qr_code_address_row_4 ? userParam.qr_code_address_row_4 : '';
  currentParam.defaultvalue = '';
  currentParam.tooltip = texts.param_tooltip_qr_code_address_row_4;
  currentParam.readValue = function() {
    userParam.qr_code_address_row_4 = this.value;
  }
  convertedParam.data.push(currentParam);


  /*******************************************************************************************
  * TEXTS
  ********************************************************************************************/
  currentParam = {};
  currentParam.name = 'texts';
  currentParam.title = texts.param_texts;
  currentParam.type = 'string';
  currentParam.value = '';
  currentParam.editable = false;
  currentParam.readValue = function() {
    userParam.texts = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'language_add';
  currentParam.parentObject = 'texts';
  currentParam.title = texts.param_language_add;
  currentParam.type = 'string';
  currentParam.value = userParam.language_add ? userParam.language_add : '';
  currentParam.defaultvalue = '';
  currentParam.tooltip = texts.param_tooltip_language_add;
  currentParam.readValue = function() {
    userParam.language_add = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'language_remove';
  currentParam.parentObject = 'texts';
  currentParam.title = texts.param_language_remove;
  currentParam.type = 'string';
  currentParam.value = userParam.language_remove ? userParam.language_remove : '';
  currentParam.defaultvalue = '';
  currentParam.tooltip = texts.param_tooltip_language_remove;
  currentParam.readValue = function() {
    userParam.language_remove = this.value;
  }
  convertedParam.data.push(currentParam);







  currentParam = {};
  currentParam.name = 'text_language_code';
  currentParam.parentObject = 'texts';
  currentParam.title = texts.param_text_language_code;
  currentParam.type = 'string';
  currentParam.value = '';
  currentParam.editable = false;
  currentParam.readValue = function() {
    userParam.text_language_code = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'text_info_invoice_number';
  currentParam.parentObject = 'text_language_code';
  currentParam.title = texts.param_text_info_invoice_number;
  currentParam.type = 'string';
  currentParam.value = userParam.text_info_invoice_number ? userParam.text_info_invoice_number : '';
  currentParam.defaultvalue = texts.invoice;
  currentParam.tooltip = texts.param_tooltip_text_info_invoice_number;
  currentParam.readValue = function() {
    userParam.text_info_invoice_number = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'text_info_date';
  currentParam.parentObject = 'text_language_code';
  currentParam.title = texts.param_text_info_date;
  currentParam.type = 'string';
  currentParam.value = userParam.text_info_date ? userParam.text_info_date : '';
  currentParam.defaultvalue = texts.date;
  currentParam.tooltip = texts.param_tooltip_text_info_date;
  currentParam.readValue = function() {
    userParam.text_info_date = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'text_info_customer';
  currentParam.parentObject = 'text_language_code';
  currentParam.title = texts.param_text_info_customer;
  currentParam.type = 'string';
  currentParam.value = userParam.text_info_customer ? userParam.text_info_customer : '';
  currentParam.defaultvalue = texts.customer;
  currentParam.tooltip = texts.param_tooltip_text_info_customer;
  currentParam.readValue = function() {
    userParam.text_info_customer = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'text_info_customer_vat_number';
  currentParam.parentObject = 'text_language_code';
  currentParam.title = texts.param_text_info_customer_vat_number;
  currentParam.type = 'string';
  currentParam.value = userParam.text_info_customer_vat_number ? userParam.text_info_customer_vat_number : '';
  currentParam.defaultvalue = texts.vat_number;
  currentParam.tooltip = texts.param_tooltip_text_info_customer_vat_number_text;
  currentParam.readValue = function() {
    userParam.text_info_customer_vat_number = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'text_info_customer_fiscal_number';
  currentParam.parentObject = 'text_language_code';
  currentParam.title = texts.param_text_info_customer_fiscal_number;
  currentParam.type = 'string';
  currentParam.value = userParam.text_info_customer_fiscal_number ? userParam.text_info_customer_fiscal_number : '';
  currentParam.defaultvalue = texts.fiscal_number;
  currentParam.tooltip = texts.param_tooltip_text_info_customer_fiscal_number;
  currentParam.readValue = function() {
    userParam.text_info_customer_fiscal_number = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'text_info_due_date';
  currentParam.parentObject = 'text_language_code';
  currentParam.title = texts.param_text_info_due_date;
  currentParam.type = 'string';
  currentParam.value = userParam.text_info_due_date ? userParam.text_info_due_date : '';
  currentParam.defaultvalue = texts.payment_terms_label;
  currentParam.tooltip = texts.param_tooltip_texts_payment_terms_label;
  currentParam.readValue = function() {
    userParam.text_info_due_date = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'text_info_page';
  currentParam.parentObject = 'text_language_code';
  currentParam.title = texts.param_text_info_page;
  currentParam.type = 'string';
  currentParam.value = userParam.text_info_page ? userParam.text_info_page : '';
  currentParam.defaultvalue = texts.page;
  currentParam.tooltip = texts.param_tooltip_text_info_page;
  currentParam.readValue = function() {
    userParam.text_info_page = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'text_shipping_address';
  currentParam.parentObject = 'text_language_code';
  currentParam.title = texts.param_text_shipping_address;
  currentParam.type = 'string';
  currentParam.value = userParam.text_shipping_address ? userParam.text_shipping_address : '';
  currentParam.defaultvalue = texts.shipping_address;
  currentParam.tooltip = texts.param_tooltip_text_shipping_address;
  currentParam.readValue = function() {
    userParam.text_shipping_address = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'title_doctype_10';
  currentParam.parentObject = 'text_language_code';
  currentParam.title = texts.param_text_title_doctype_10;
  currentParam.type = 'string';
  currentParam.value = userParam.title_doctype_10 ? userParam.title_doctype_10 : '';
  currentParam.defaultvalue = texts.invoice + " <DocInvoice>";
  currentParam.tooltip = texts.param_tooltip_title_doctype_10;
  currentParam.readValue = function() {
    userParam.title_doctype_10 = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'title_doctype_12';
  currentParam.parentObject = 'text_language_code';
  currentParam.title = texts.param_text_title_doctype_12;
  currentParam.type = 'string';
  currentParam.value = userParam.title_doctype_12 ? userParam.title_doctype_12 : '';
  currentParam.defaultvalue = texts.credit_note  + " <DocInvoice>";
  currentParam.tooltip = texts.param_tooltip_title_doctype_12;
  currentParam.readValue = function() {
    userParam.title_doctype_12 = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'text_details_columns';
  currentParam.parentObject = 'text_language_code';
  currentParam.title = texts.param_text_details_columns;
  currentParam.type = 'string';
  currentParam.value = userParam.text_details_columns ? userParam.text_details_columns : '';
  currentParam.defaultvalue = texts.description+";"+texts.quantity+";"+texts.reference_unit+";"+texts.unit_price+";"+texts.amount;
  currentParam.tooltip = texts.param_tooltip_text_details_columns;
  currentParam.readValue = function() {
    userParam.text_details_columns = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'texts_total';
  currentParam.parentObject = 'text_language_code';
  currentParam.title = texts.param_text_total;
  currentParam.type = 'string';
  currentParam.value = userParam.texts_total ? userParam.texts_total : '';
  currentParam.defaultvalue = texts.total;
  currentParam.tooltip = texts.param_tooltip_texts_total;
  currentParam.readValue = function() {
    userParam.texts_total = this.value;
  }
  convertedParam.data.push(currentParam);






  /*******************************************************************************************
  * STYLES
  *******************************************************************************************/
  currentParam = {};
  currentParam.name = 'styles';
  currentParam.title = texts.param_styles;
  currentParam.type = 'string';
  currentParam.value = '';
  currentParam.editable = false;
  currentParam.readValue = function() {
    userParam.param_styles = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'font_family';
  currentParam.parentObject = 'styles';
  currentParam.title = texts.param_font_family;
  currentParam.type = 'string';
  currentParam.value = userParam.font_family ? userParam.font_family : 'Helvetica';
  currentParam.defaultvalue = 'Helvetica';
  currentParam.tooltip = texts.param_tooltip_font_family;
  currentParam.readValue = function() {
   userParam.font_family = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'font_size';
  currentParam.parentObject = 'styles';
  currentParam.title = texts.param_font_size;
  currentParam.type = 'string';
  currentParam.value = userParam.font_size ? userParam.font_size : '10';
  currentParam.defaultvalue = '10';
  currentParam.tooltip = texts.param_tooltip_font_size;
  currentParam.readValue = function() {
   userParam.font_size = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'background_color_1';
  currentParam.parentObject = 'styles';
  currentParam.title = texts.param_background_color_1;
  currentParam.type = 'string';
  currentParam.value = userParam.background_color_1 ? userParam.background_color_1 : '#337ab7';
  currentParam.defaultvalue = '#337ab7';
  currentParam.tooltip = texts.param_tooltip_background_color_1;
  currentParam.readValue = function() {
   userParam.background_color_1 = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'color';
  currentParam.parentObject = 'styles';
  currentParam.title = texts.param_color;
  currentParam.type = 'string';
  currentParam.value = userParam.color ? userParam.color : '#ffffff';
  currentParam.defaultvalue = '#ffffff';
  currentParam.tooltip = texts.param_tooltip_color;
  currentParam.readValue = function() {
   userParam.color = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'background_color_2';
  currentParam.parentObject = 'styles';
  currentParam.title = texts.param_background_color_2;
  currentParam.type = 'string';
  currentParam.value = userParam.background_color_2 ? userParam.background_color_2 : '#F0F8FF';
  currentParam.defaultvalue = '#F0F8FF';
  currentParam.tooltip = texts.param_tooltip_background_color_2;
  currentParam.readValue = function() {
   userParam.background_color_2 = this.value;
  }
  convertedParam.data.push(currentParam);



  /*******************************************************************************************
  * EMBEDDED JAVASCRIPT FILEE
  *******************************************************************************************/
  currentParam = {};
  currentParam.name = 'embedded_javascript';
  currentParam.title = texts.param_embedded_javascript;
  currentParam.type = 'string';
  currentParam.value = '';
  currentParam.editable = false;
  currentParam.readValue = function() {
    userParam.embedded_javascript = this.value;
  }
  convertedParam.data.push(currentParam);

  currentParam = {};
  currentParam.name = 'embedded_javascript_filename';
  currentParam.parentObject = 'embedded_javascript';
  currentParam.title = texts.param_embedded_javascript_filename;
  currentParam.type = 'string';
  currentParam.value = userParam.embedded_javascript_filename ? userParam.embedded_javascript_filename : '';
  currentParam.defaultvalue = '';
  currentParam.tooltip = texts.param_tooltip_javascript_filename;
  currentParam.readValue = function() {
   userParam.embedded_javascript_filename = this.value;
  }
  convertedParam.data.push(currentParam);



  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // ADD A NEW LANGUAGE
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /* 
  if (userParam.language_add) {

    var languageCode = userParam.language_add;

    //if (convertedParam.added_languages.indexOf(languageCode) < 0) {

      Banana.console.log("New language: " + languageCode);
      added_languages.push(languageCode);


      currentParam = {};
      currentParam.name = languageCode;
      currentParam.parentObject = 'texts';
      currentParam.title = texts.languageCode;
      currentParam.type = 'string';
      currentParam.value = '';
      currentParam.editable = false;
      currentParam.readValue = function() {
        userParam.languageCode = this.value;
      }
      convertedParam.data.push(currentParam);

      currentParam = {};
      currentParam.name = languageCode+'_text_info_invoice_number';
      currentParam.parentObject = languageCode;
      currentParam.title = texts.param_text_info_invoice_number;
      currentParam.type = 'string';
      currentParam.value = userParam[languageCode+'_text_info_invoice_number'] ? userParam[languageCode+'_text_info_invoice_number'] : ''; //param.xxx ? param.xxx : ''
      currentParam.defaultvalue = '';
      currentParam.tooltip = texts.param_tooltip_text_info_invoice_number;
      currentParam.readValue = function() {
        userParam[languageCode+'_text_info_invoice_number'] = this.value;
      }
      convertedParam.data.push(currentParam);

    //}

  }

  */

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return convertedParam;
}

function initParam() {
  var userParam = {};

  var lang = 'en';
  if (Banana.document.locale) {
    lang = Banana.document.locale;
  }
  if (lang.length > 2) {
    lang = lang.substr(0, 2);
  }
  var texts = setInvoiceTexts(lang);

  //Include
  userParam.header_print = true;
  userParam.header_left = false;
  userParam.header_row_1 = "";
  userParam.header_row_2 = "";
  userParam.header_row_3 = "";
  userParam.header_row_4 = "";
  userParam.header_row_5 = "";
  userParam.logo_print = true;
  userParam.logo_name = 'Logo';
  userParam.address_small_line = '<none>';
  userParam.address_left = false;
  userParam.shipping_address = false;
  userParam.info_invoice_number = true;
  userParam.info_date = true;
  userParam.info_customer = true;
  userParam.info_customer_vat_number = false;
  userParam.info_customer_fiscal_number = false;
  userParam.info_due_date = true;
  userParam.info_page = true;
  userParam.details_columns = texts.description+";"+texts.quantity+";"+texts.reference_unit+";"+texts.unit_price+";"+texts.amount;
  userParam.details_columns_widths = '50%;10%;10%;15%;15%';
  userParam.details_gross_amounts = false;
  userParam.footer_add = false;
  userParam.footer_left = texts.invoice;
  userParam.footer_center = '';
  userParam.footer_right = texts.page+' &['+texts.page+']';
  userParam.qr_code_add = false;
  userParam.qr_code_align = 'right';
  userParam.qr_code_use_different_address = false;
  userParam.qr_code_address_row_1 = '';
  userParam.qr_code_address_row_2 = '';
  userParam.qr_code_address_row_3 = '';
  userParam.qr_code_address_row_4 = '';

  //Texts
  userParam.language_add = "";
  userParam.language_remove = "";
  userParam.text_info_invoice_number = texts.invoice;
  userParam.text_info_date = texts.date;
  userParam.text_info_customer = texts.customer;
  userParam.text_info_customer_vat_number = texts.vat_number;
  userParam.text_info_customer_fiscal_number = texts.fiscal_number;
  userParam.text_info_due_date = texts.payment_terms_label;
  userParam.text_info_page = texts.page;
  userParam.text_shipping_address = texts.shipping_address;
  userParam.title_doctype_10 = texts.invoice + " <DocInvoice>";
  userParam.title_doctype_12 = texts.credit_note + " <DocInvoice>";
  userParam.text_details_columns = texts.description+";"+texts.quantity+";"+texts.reference_unit+";"+texts.unit_price+";"+texts.amount;
  userParam.texts_total = texts.total;

  //Styles
  userParam.background_color_1 = '#337ab7';
  userParam.color = '#ffffff';
  userParam.background_color_2 = '#F0F8FF';
  userParam.color_4 = '';
  userParam.font_family = 'Helvetica';
  userParam.font_size = '10';
  userParam.address_margin_left = '113';
  userParam.address_margin_top = '45';

  //Embedded JavaScript file
  userParam.embedded_javascript_filename = '';

  return userParam;
}

function verifyParam(userParam) {

  var lang = 'en';
  if (Banana.document.locale) {
    lang = Banana.document.locale;
  }
  if (lang.length > 2) {
    lang = lang.substr(0, 2);
  }
  var texts = setInvoiceTexts(lang);

  //Include
  if (!userParam.header_print) {
    userParam.header_print = false;
  }
  if (!userParam.header_left) {
    userParam.header_left = false;
  }
  if(!userParam.header_row_1) {
    userParam.header_row_1 = '';
  }
  if(!userParam.header_row_2) {
    userParam.header_row_2 = '';
  }
  if(!userParam.header_row_3) {
    userParam.header_row_3 = '';
  }
  if(!userParam.header_row_4) {
    userParam.header_row_4 = '';
  }
  if(!userParam.header_row_5) {
    userParam.header_row_5 = '';
  }
  if (!userParam.logo_print) {
    userParam.logo_print = false;
  }
  if (!userParam.logo_name) {
    userParam.logo_name = 'Logo';
  }
  if (!userParam.address_small_line) {
    userParam.address_small_line = '';
  }
  if (!userParam.address_left) {
    userParam.address_left = false;
  }
  if (!userParam.shipping_address) {
    userParam.shipping_address = false;
  }
  if (!userParam.info_invoice_number) {
    userParam.info_invoice_number = false;
  }
  if (!userParam.info_date) {
    userParam.info_date = false;
  }
  if (!userParam.info_customer) {
    userParam.info_customer = false;
  }
  if (!userParam.info_customer_vat_number) {
    userParam.info_customer_vat_number = false;
  }
  if (!userParam.info_customer_fiscal_number) {
    userParam.info_customer_fiscal_number = false;
  }
  if (!userParam.info_due_date) {
    userParam.info_due_date = false;
  }
  if (!userParam.info_page) {
    userParam.info_page = false;
  }
  if (!userParam.details_columns) {
    userParam.details_columns = texts.description+";"+texts.quantity+";"+texts.reference_unit+";"+texts.unit_price+";"+texts.amount;
  }
  if (!userParam.details_columns_widths) {
    userParam.details_columns_widths = '50%;10%;10%;15%;15%';
  }
  if (!userParam.details_gross_amounts) {
    userParam.details_gross_amounts = false;
  }
  if (!userParam.footer_add) {
    userParam.footer_add = false;
  }
  if (!userParam.footer_left) {
    userParam.footer_left = texts.invoice;
  }
  if (!userParam.footer_center) {
    userParam.footer_center = '';
  }
  if (!userParam.footer_right) {
    userParam.footer_right = texts.page+' &['+texts.page+']';
  }
  if (!userParam.qr_code_add) {
    userParam.qr_code_add = false;
  }
  if (!userParam.qr_code_align) {
    userParam.qr_code_align = 'right';
  }
  if (!userParam.qr_code_use_different_address) {
    userParam.qr_code_use_different_address = false;
  }
  if (!userParam.qr_code_address_row_1) {
    userParam.qr_code_address_row_1 = '';
  }
  if (!userParam.qr_code_address_row_2) {
    userParam.qr_code_address_row_2 = '';
  }
  if (!userParam.qr_code_address_row_3) {
    userParam.qr_code_address_row_3 = '';
  }
  if (!userParam.qr_code_address_row_4) {
    userParam.qr_code_address_row_4 = '';
  }


  //Texts
  if (!userParam.language_add) {
    userParam.language_add = '';
  }
  if (!userParam.language_remove) {
    userParam.language_remove = '';
  }
  if (!userParam.text_info_invoice_number) {
    userParam.text_info_invoice_number = texts.invoice;
  }
  if (!userParam.text_info_date) {
    userParam.text_info_date = texts.date;
  }
  if (!userParam.text_info_customer) {
    userParam.text_info_customer = texts.customer;
  }
  if (!userParam.text_info_customer_vat_number) {
    userParam.text_info_customer_vat_number = texts.vat_number;
  }
  if (!userParam.text_info_customer_fiscal_number) {
    userParam.text_info_customer_fiscal_number = texts.fiscal_number;
  }
  if (!userParam.text_info_due_date) {
    userParam.text_info_due_date = texts.payment_terms_label;
  }
  if (!userParam.text_info_page) {
    userParam.text_info_page = texts.page;
  }
  if (!userParam.text_shipping_address) {
    userParam.text_shipping_address = texts.shipping_address;
  }
  if (!userParam.title_doctype_10) {
    userParam.title_doctype_10 = texts.invoice + " <DocInvoice>";
  }
  if (!userParam.title_doctype_12) {
    userParam.title_doctype_12 = texts.credit_note + " <DocInvoice>";
  }
  if (!userParam.text_details_columns) {
    userParam.text_details_columns = texts.description+";"+texts.quantity+";"+texts.reference_unit+";"+texts.unit_price+";"+texts.amount;
  }
  if (!userParam.texts_total) {
    userParam.texts_total = texts.total;
  }


  // Styles
  if (!userParam.background_color_1) {
    userParam.background_color_1 = '#337ab7';
  }
  if (!userParam.color) {
    userParam.color = '#ffffff';
  }
  if (!userParam.background_color_2) {
    userParam.background_color_2 = '#F0F8FF';
  }
  if (!userParam.color_4) {
    userParam.color_4 = '';
  }
  if (!userParam.font_family) {
    userParam.font_family = 'Helvetica';
  }
  if (!userParam.font_size) {
    userParam.font_size = '10';
  }
  if (!userParam.address_margin_left) {
    userParam.address_margin_left = '113';
  }
  if (!userParam.address_margin_top) {
    userParam.address_margin_top = '45';
  }

  //Embedded JavaScript files
  if (!userParam.embedded_javascript_filename) {
    userParam.embedded_javascript_filename = '';
  }

  return userParam;
}



//====================================================================//
// MAIN FUNCTIONS THAT PRINT THE INVOICE
//====================================================================//
function printDocument(jsonInvoice, repDocObj, repStyleObj) {
  var userParam = initParam();
  var savedParam = Banana.document.getScriptSettings();
  if (savedParam.length > 0) {
    userParam = JSON.parse(savedParam);
    userParam = verifyParam(userParam);
  }

  // jsonInvoice can be a json string or a js object
  var invoiceObj = null;
  if (typeof(jsonInvoice) === 'object') {
    invoiceObj = jsonInvoice;
  } else if (typeof(jsonInvoice) === 'string') {
    invoiceObj = JSON.parse(jsonInvoice)
  }

  // Invoice texts which need translation
  var langDoc = '';
  if (invoiceObj.customer_info.lang) {
    langDoc = invoiceObj.customer_info.lang;
  }
  if (langDoc.length <= 0) {
    langDoc = invoiceObj.document_info.locale;
  }
  var texts = setInvoiceTexts(langDoc);
  
  // Include the embedded javascript file entered by the user
  includeEmbeddedJavascriptFile(texts, userParam);
  
  // Variable starts with $
  var cssVariables = {};
  set_css_variables(cssVariables, userParam);
  
  // Function call to print the invoice document
  repDocObj = printInvoice(Banana.document, repDocObj, texts, userParam, repStyleObj, invoiceObj);
  set_invoice_style(repDocObj, repStyleObj, cssVariables, userParam);


  var d = new Date();
  Banana.console.log("...printDocument() FINISHED... " + d);

}

function printInvoice(banDoc, repDocObj, texts, userParam, repStyleObj, invoiceObj) {

  /*
    This function build the invoice document calling all the functions that prints
    the different parts of the document.

    Invoice parts:
    - header
    - info
    - address
    - shipping address
    - begin text
    - details
    - final texts
    - footer

    By default are used standard functions, but if 'hook' functions are defined we use them.

  */

  
  // Invoice document
  var reportObj = Banana.Report;
  if (!repDocObj) {
    repDocObj = reportObj.newReport(getTitle(invoiceObj, texts, userParam) + " " + invoiceObj.document_info.number);
  } 
  // else {
  //   var pageBreak = repDocObj.addPageBreak();
  //   pageBreak.addClass("pageReset");
  // }


  /* PRINT HEADER */
  if (typeof(hook_print_header) === typeof(Function)) {
    hook_print_header(repDocObj);
  } else {
    print_header(repDocObj, userParam, repStyleObj, invoiceObj);
  }

  /* PRINT INVOICE INFO */
  if (typeof(hook_print_info) === typeof(Function)) {
    hook_print_info(repDocObj, invoiceObj, texts, userParam);
  } else {
    print_info(repDocObj, invoiceObj, texts, userParam);
  }

  /* PRINT CUSTOMER ADDRESS */
  if (typeof(hook_print_customer_address) === typeof(Function)) {
    hook_print_customer_address(repDocObj, invoiceObj, userParam);
  } else {
    print_customer_address(repDocObj, invoiceObj, userParam);
  }

  /* PRINT SHIPPING ADDRESS */
  if (userParam.shipping_address) {
    if (typeof(hook_print_shipping_address) === typeof(Function)) {
      hook_print_shipping_address(repDocObj, invoiceObj, texts, userParam);
    } else {
      print_shipping_address(repDocObj, invoiceObj, texts, userParam);
    }
  }

  /* PRINT BEGIN TEXT (BEFORE INVOICE DETAILS) */
  if (typeof(hook_print_text_begin) === typeof(Function)) {
    hook_print_text_begin(repDocObj, invoiceObj, texts, userParam);
  } else {
    print_text_begin(repDocObj, invoiceObj, texts, userParam);
  }

  /* PRINT INVOICE INFO FOR PAGES 2+ */
  if (typeof(hook_print_info) === typeof(Function)) {
    hook_print_info(repDocObj.getHeader(), invoiceObj, texts, userParam, "info_table_row0");
  } else {
    print_info(repDocObj.getHeader(), invoiceObj, texts, userParam, "info_table_row0");
  }

  /* PRINT INVOICE DETAILS */
  var detailsTable = repDocObj.addTable("doc_table");
  if (userParam.details_gross_amounts) {
    if (typeof(hook_print_details_gross_amounts) === typeof(Function)) {
      hook_print_details_gross_amounts(banDoc, repDocObj, invoiceObj, texts, userParam, detailsTable);
    } else {
      print_details_gross_amounts(banDoc, repDocObj, invoiceObj, texts, userParam, detailsTable);
    }
  }
  else {
    if (typeof(hook_print_details_net_amounts) === typeof(Function)) {
      hook_print_details_net_amounts(banDoc, repDocObj, invoiceObj, texts, userParam, detailsTable);
    } else {
      print_details_net_amounts(banDoc, repDocObj, invoiceObj, texts, userParam, detailsTable);
    }
  }

  /* PRINT FINAL TEXTS (AFTER INVOICE DETAILS) */
  if (typeof(hook_print_final_texts) === typeof(Function)) {
    hook_print_final_texts(repDocObj, invoiceObj, detailsTable);
  } else {
    print_final_texts(repDocObj, invoiceObj, detailsTable);
  }

  /* PRINT FOOTER */
  if (typeof(hook_print_footer) === typeof(Function)) {
    hook_print_footer(repDocObj, texts, userParam);
  } else {
    print_footer(repDocObj, texts, userParam);
  }

  return repDocObj;
}






//====================================================================//
// FUNCTIONS THAT PRINT ALL THE DIFFERENT PARTS OF THE INVOICE.
// USER CAN REPLACE THEM WITH 'HOOK' FUNCTIONS DEFINED USING EMBEDDED 
// JAVASCRIPT FILES ON DOCUMENTS TABLE
//====================================================================//
function print_header(repDocObj, userParam, repStyleObj, invoiceObj) {
  var headerLogoSection = repDocObj.addSection("");
  if (userParam.logo_print) {
    var logoFormat = Banana.Report.logoFormat(userParam.logo_name); //Logo
    if (logoFormat) {
      var logoElement = logoFormat.createDocNode(headerLogoSection, repStyleObj, "logo");
      repDocObj.getHeader().addChild(logoElement);
    }
  }

  if (userParam.header_print) {

    if (userParam.header_left) {
      var headerParagraph = repDocObj.getHeader().addSection("header_left_text");
    } else {
      var headerParagraph = repDocObj.getHeader().addSection("header_right_text");
    }

    if (userParam.header_row_1) {
      if (userParam.header_row_1.length > 0) {
        headerParagraph.addParagraph(userParam.header_row_1, "").setStyleAttributes("font-weight:bold; font-size:16pt; color:" + userParam.background_color_1);
      }
      if (userParam.header_row_2.length > 0) {
        headerParagraph.addParagraph(userParam.header_row_2, "").setStyleAttributes("font-weight:bold; font-size:10pt;");
      }
      if (userParam.header_row_3.length > 0) {
        headerParagraph.addParagraph(userParam.header_row_3, "").setStyleAttributes("font-weight:bold; font-size:10pt;");
      }
      if (userParam.header_row_4.length > 0) {
        headerParagraph.addParagraph(userParam.header_row_4, "").setStyleAttributes("font-weight:bold; font-size:10pt;");
      }
      if (userParam.header_row_5.length > 0) {
        headerParagraph.addParagraph(userParam.header_row_5, "").setStyleAttributes("font-weight:bold; font-size:10pt;");
      }
    }
    else {
      var supplierNameLines = getInvoiceSupplierName(invoiceObj.supplier_info).split('\n');
      for (var i = 0; i < supplierNameLines.length; i++) {
        headerParagraph.addParagraph(supplierNameLines[i], "").setStyleAttributes("font-weight:bold; font-size:16pt; color:" + userParam.background_color_1);
      }
      var supplierLines = getInvoiceSupplier(invoiceObj.supplier_info).split('\n');
      for (var i = 0; i < supplierLines.length; i++) {
        headerParagraph.addParagraph(supplierLines[i], "").setStyleAttributes("font-weight:bold; font-size:10pt;");
      }      
    }
  }
}

function print_info(repDocObj, invoiceObj, texts, userParam, tableStyleRow0) {

  var infoTable = "";

  // info table that starts at row 0, for pages 2+
  if (tableStyleRow0) {
    infoTable = repDocObj.addTable(tableStyleRow0);
  }
  else {
    if (userParam.address_left) {
      infoTable = repDocObj.addTable("info_table_right");
    } else {
      infoTable = repDocObj.addTable("info_table_left");
    }
  }

  if (userParam.info_invoice_number) {
    tableRow = infoTable.addRow();
    tableRow.addCell(userParam.text_info_invoice_number + ":","",1);
    tableRow.addCell(invoiceObj.document_info.number,"",1);
  }
  if (userParam.info_date) {
    tableRow = infoTable.addRow();
    tableRow.addCell(userParam.text_info_date + ":","",1);
    tableRow.addCell(Banana.Converter.toLocaleDateFormat(invoiceObj.document_info.date),"",1);    
  }
  if (userParam.info_customer) {
    tableRow = infoTable.addRow();
    tableRow.addCell(userParam.text_info_customer + ":","",1);
    tableRow.addCell(invoiceObj.customer_info.number,"",1);    
  }
  if (userParam.info_customer_vat_number) {
    tableRow = infoTable.addRow();
    tableRow.addCell(userParam.text_info_customer_vat_number + ":","",1);
    tableRow.addCell(invoiceObj.customer_info.vat_number);
  }
  if (userParam.info_customer_fiscal_number) {
    tableRow = infoTable.addRow();
    tableRow.addCell(userParam.text_info_customer_fiscal_number + ":","",1);
    tableRow.addCell(invoiceObj.customer_info.fiscal_number);
  }
  if (userParam.info_due_date) {
    //Payment Terms
    var payment_terms_label = texts.payment_terms_label;
    var payment_terms = '';
    if (invoiceObj.billing_info.payment_term) {
      payment_terms = invoiceObj.billing_info.payment_term;
    }
    else if (invoiceObj.payment_info.due_date) {
      payment_terms_label = texts.payment_due_date_label
      payment_terms = Banana.Converter.toLocaleDateFormat(invoiceObj.payment_info.due_date);
    }

    tableRow = infoTable.addRow();
    tableRow.addCell(userParam.text_info_due_date + ":","",1);
    tableRow.addCell(payment_terms,"",1);    
  }
  if (userParam.info_page) {
    tableRow = infoTable.addRow();
    tableRow.addCell(userParam.text_info_page + ":","",1);
    tableRow.addCell("","",1).addFieldPageNr();    
  }
}

function print_customer_address(repDocObj, invoiceObj, userParam) {
  var customerAddressTable = "";
  if (userParam.address_left) {
    customerAddressTable = repDocObj.addTable("address_table_left");
  } else {
    customerAddressTable = repDocObj.addTable("address_table_right");
  }
  //Small line of the supplier address
  tableRow = customerAddressTable.addRow();
  var cell = tableRow.addCell("", "", 1);
  if (userParam.address_small_line) {
    if (userParam.address_small_line === "<none>") {
      cell.addText("","");
    } else {
      cell.addText(userParam.address_small_line, "small_address");
    }
  }
  else {
    var supplierNameLines = getInvoiceSupplierName(invoiceObj.supplier_info).split('\n');
    cell.addText(supplierNameLines[0], "small_address");
    var supplierLines = getInvoiceSupplier(invoiceObj.supplier_info).split('\n');
    cell.addText(" - " + supplierLines[0] + " - " + supplierLines[1], "small_address");
  }
  
  // Invoice address / shipping address
  tableRow = customerAddressTable.addRow();
  var cell = tableRow.addCell("", "", 1);

  // Customer address
  var customerAddress = getInvoiceAddress(invoiceObj.customer_info).split('\n');
  for (var i = 0; i < customerAddress.length; i++) {
    cell.addParagraph(customerAddress[i]);
  }
}

function print_shipping_address(repDocObj, invoiceObj, texts, userParam) {

  var billingAndShippingAddress = repDocObj.addTable("shipping_address");
  var tableRow;

  tableRow = billingAndShippingAddress.addRow();
  var shippingCell = tableRow.addCell("","",1);

  // Shipping address
  if (invoiceObj.shipping_info.different_shipping_address) {
    if (userParam.text_shipping_address) {
      shippingCell.addParagraph(userParam.text_shipping_address,"").setStyleAttributes("font-weight:bold;color:"+userParam.background_color_1+";");
    } else {
      shippingCell.addParagraph(texts.shipping_address, "").setStyleAttributes("font-weight:bold;color:"+userParam.background_color_1+";");
    }
    var shippingAddress = getInvoiceAddress(invoiceObj.shipping_info).split('\n');
    for (var i = 0; i < shippingAddress.length; i++) {
      shippingCell.addParagraph(shippingAddress[i]);
    }
  }
}

function print_text_begin(repDocObj, invoiceObj, texts, userParam) {
  /*
    Prints the text before the invoice details
  */
  var docTypeTitle = getTitle(invoiceObj, texts, userParam);
  var table = repDocObj.addTable("begin_text_table");
  var tableRow;

  if (docTypeTitle) {
    tableRow = table.addRow();
    var titleCell = tableRow.addCell("","",1);
    titleCell.addParagraph(docTypeTitle.replace(/<DocInvoice>/g,invoiceObj.document_info.number), "title_text");
    titleCell.addParagraph("", "");
    titleCell.addParagraph("", "");
  }
  if (invoiceObj.document_info.text_begin) {
    tableRow = table.addRow();
    var textCell = tableRow.addCell("","begin_text",1);
    addMdBoldText(textCell, invoiceObj.document_info.text_begin);
    textCell.addParagraph(" ", "");
    textCell.addParagraph(" ", "");  
  }
}

function print_details_net_amounts(banDoc, repDocObj, invoiceObj, texts, userParam, detailsTable) {

  /* 
    Print the invoice details using net Amounts (VAT excluded) 
  */

  var columnsDimension = userParam.details_columns_widths.split(";");

  //var repTableObj = repDocObj.addTable("doc_table");
  var repTableObj = detailsTable;
  var repTableCol1 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[0]);
  var repTableCol2 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[1]);
  var repTableCol3 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[2]);
  var repTableCol4 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[3]);
  var repTableCol5 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[4]);
  var repTableCol6 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[5]);
  var repTableCol7 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[6]);
  var repTableCol8 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[7]);
  var repTableCol9 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[8]);
  var repTableCol10 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[9]);

  var header = repTableObj.getHeader().addRow();

  // Creates the header with the parameter's values
  // If user insert other columns names we use them,
  // otherwise we use the XmlValue inserted when choosing the columns to display
  var columnsSelected = userParam.details_columns.split(";");
  var columnsNames = userParam.text_details_columns.split(";");

  // remove all empty values ("", null, undefined): 
  columnsSelected = columnsSelected.filter(function(e){return e});
  columnsNames = columnsNames.filter(function(e){return e});

  if (userParam.text_details_columns) {
    for (var i = 0; i < columnsNames.length; i++) {
      columnsNames[i] = columnsNames[i].trim();
      if (columnsNames[i] === "<none>") {
        header.addCell("", "doc_table_header", 1);
      } else {
        header.addCell(columnsNames[i], "doc_table_header center", 1);
      }
      columnsNumber ++;
    }
  }
  else {
    for (var i = 0; i < columnsSelected.length; i++) {
      columnsSelected[i] = columnsSelected[i].trim();
      header.addCell(columnsSelected[i], "doc_table_header center", 1);
      columnsNumber ++;
    }
  }

  //ITEMS
  for (var i = 0; i < invoiceObj.items.length; i++) {

    var item = invoiceObj.items[i];
    var className = "item_cell";
    if (item.item_type && item.item_type.indexOf("total") === 0) {
      className = "subtotal_cell";
    }
    if (item.item_type && item.item_type.indexOf("note") === 0) {
      className = "note_cell";
    }

    var classNameEvenRow = "";
    if (i % 2 == 0) {
      classNameEvenRow = "even_rows_background_color";
    }

    tableRow = repTableObj.addRow();

    for (var j = 0; j < columnsSelected.length; j++) {
      if (columnsSelected[j] === "Description") {
        var descriptionCell = tableRow.addCell("", classNameEvenRow + " padding-left padding-right " + className, 1);
        descriptionCell.addParagraph(item.description);
        descriptionCell.addParagraph(item.description2);
      }
      else if (columnsSelected[j] === "Quantity" || columnsSelected[j] === "quantity") {
        // If referenceUnit is empty we do not print the quantity.
        // With this we can avoit to print the quantity "1.00" for transactions that do not have  quantity,unit,unitprice.
        // Default quantity uses 2 decimals. We check if there is a quantity with 4 decimals and in case we use it.
        if (item.mesure_unit) {
          var decimals = 2;
          var res = item.quantity.split(".");
          if (res[1] && res[1].length == 4 && res[1] !== "0000") {
            decimals = 4;
          }
          tableRow.addCell(Banana.Converter.toLocaleNumberFormat(item.quantity,decimals), classNameEvenRow + " right padding-left padding-right " + className, 1);
        } else {
          tableRow.addCell("", classNameEvenRow + " right padding-left padding-right " + className, 1);
        }
      }
      else if (columnsSelected[j] === "ReferenceUnit" || columnsSelected[j] === "referenceunit" || columnsSelected[j] === "mesure_unit") {
        tableRow.addCell(item.mesure_unit, classNameEvenRow + " center padding-left padding-right " + className, 1);
      }
      else if (columnsSelected[j] === "UnitPrice" || columnsSelected[j] === "unitprice" || columnsSelected[j] === "unit_price") {
        tableRow.addCell(Banana.Converter.toLocaleNumberFormat(item.unit_price.calculated_amount_vat_exclusive), classNameEvenRow + " right padding-left padding-right " + className, 1);
      }
      else if (columnsSelected[j] === "Amount" || columnsSelected[j] === "amount" || columnsSelected[j] === "total_amount_vat_exclusive") {
        tableRow.addCell(toInvoiceAmountFormat(invoiceObj, item.total_amount_vat_exclusive), classNameEvenRow + " right padding-left padding-right " + className, 1);
      }
      else {
        var userColumnValue = "";
        userColumnValue = getUserColumnValue(banDoc, invoiceObj.document_info.number, item.origin_row, columnsSelected[j]);
        tableRow.addCell(userColumnValue, classNameEvenRow + " padding-left padding-right " + className, 1);
      }
    }
  }

  tableRow = repTableObj.addRow();
  tableRow.addCell("", "thin-border-top", columnsNumber);

  //TOTAL NET
  if (invoiceObj.billing_info.total_vat_rates.length > 0) {
    tableRow = repTableObj.addRow();
    tableRow.addCell(texts.totalnet, "padding-left padding-right", columnsNumber-1);
    tableRow.addCell(toInvoiceAmountFormat(invoiceObj, invoiceObj.billing_info.total_amount_vat_exclusive), "right padding-left padding-right", 1);

    for (var i = 0; i < invoiceObj.billing_info.total_vat_rates.length; i++) {
      tableRow = repTableObj.addRow();
      tableRow.addCell(texts.vat + " " + invoiceObj.billing_info.total_vat_rates[i].vat_rate + "% (" + toInvoiceAmountFormat(invoiceObj, invoiceObj.billing_info.total_vat_rates[i].total_amount_vat_exclusive) + ")", "padding-left padding-right", columnsNumber-1);
      tableRow.addCell(toInvoiceAmountFormat(invoiceObj, invoiceObj.billing_info.total_vat_rates[i].total_vat_amount), "right padding-left padding-right", 1);
    }
  }

  //TOTAL ROUNDING DIFFERENCE
  if (invoiceObj.billing_info.total_rounding_difference.length) {
    tableRow = repTableObj.addRow();
    tableRow.addCell(texts.rounding, "padding-left padding-right", columnsNumber-1);
    tableRow.addCell(toInvoiceAmountFormat(invoiceObj, invoiceObj.billing_info.total_rounding_difference), "right padding-left padding-right", 1);
  }
  tableRow = repTableObj.addRow();
  tableRow.addCell("", "thin-border-top", columnsNumber);

  //FINAL TOTAL
  tableRow = repTableObj.addRow();
  tableRow.addCell(userParam.texts_total + " " + invoiceObj.document_info.currency, "total_cell", columnsNumber-1);
  tableRow.addCell(toInvoiceAmountFormat(invoiceObj, invoiceObj.billing_info.total_to_pay), "total_cell right", 1);
  
  tableRow = repTableObj.addRow();
  tableRow.addCell("", "", columnsNumber);


  // Print QR Code
  if (userParam.qr_code_add) {
    print_qr_code(invoiceObj, texts, userParam, repTableObj);
  }
}

function print_details_gross_amounts(banDoc, repDocObj, invoiceObj, texts, userParam, detailsTable) {

  /* 
    Prints the invoice details using gross Amounts (VAT included)
  */

  var columnsDimension = userParam.details_columns_widths.split(";");

  //var repTableObj = repDocObj.addTable("doc_table");
  var repTableObj = detailsTable;
  var repTableCol1 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[0]);
  var repTableCol2 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[1]);
  var repTableCol3 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[2]);
  var repTableCol4 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[3]);
  var repTableCol5 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[4]);
  var repTableCol6 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[5]);
  var repTableCol7 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[6]);
  var repTableCol8 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[7]);
  var repTableCol9 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[8]);
  var repTableCol10 = repTableObj.addColumn().setStyleAttributes("width:"+columnsDimension[9]);

  var header = repTableObj.getHeader().addRow();

  // Creates the header with the parameter's values
  // If user insert other columns names we use them,
  // otherwise we use the XmlValue inserted when choosing the columns to display
  var columnsSelected = userParam.details_columns.split(";");
  var columnsNames = userParam.text_details_columns.split(";");

  // remove all empty values ("", null, undefined): 
  columnsSelected = columnsSelected.filter(function(e){return e});
  columnsNames = columnsNames.filter(function(e){return e});

  if (userParam.text_details_columns) {
    for (var i = 0; i < columnsNames.length; i++) {
      columnsNames[i] = columnsNames[i].trim();
      if (columnsNames[i] === "<none>") {
        header.addCell("", "doc_table_header", 1);
      } else {
        header.addCell(columnsNames[i], "doc_table_header center", 1);
      }
      columnsNumber ++;
    }
  }
  else {
    for (var i = 0; i < columnsSelected.length; i++) {
      columnsSelected[i] = columnsSelected[i].trim();
      header.addCell(columnsSelected[i], "doc_table_header center", 1);
      columnsNumber ++;
    }
  }

  //ITEMS
  for (var i = 0; i < invoiceObj.items.length; i++) {

    var item = invoiceObj.items[i];
    var className = "item_cell";
    if (item.item_type && item.item_type.indexOf("total") === 0) {
      className = "subtotal_cell";
    }
    if (item.item_type && item.item_type.indexOf("note") === 0) {
      className = "note_cell";
    }

    var classNameEvenRow = "";
    if (i % 2 == 0) {
      classNameEvenRow = "even_rows_background_color";
    }

    tableRow = repTableObj.addRow();

    for (var j = 0; j < columnsSelected.length; j++) {
      if (columnsSelected[j] === "Description") {
        var descriptionCell = tableRow.addCell("", classNameEvenRow + " padding-left padding-right " + className, 1);
        descriptionCell.addParagraph(item.description);
        descriptionCell.addParagraph(item.description2);
      }
      else if (columnsSelected[j] === "Quantity" || columnsSelected[j] === "quantity") {
        // If referenceUnit is empty we do not print the quantity.
        // With this we can avoit to print the quantity "1.00" for transactions that do not have  quantity,unit,unitprice.
        // Default quantity uses 2 decimals. We check if there is a quantity with 4 decimals and in case we use it.
        if (item.mesure_unit) {
          var decimals = 2;
          var res = item.quantity.split(".");
          if (res[1] && res[1].length == 4 && res[1] !== "0000") {
            decimals = 4;
          }
          tableRow.addCell(Banana.Converter.toLocaleNumberFormat(item.quantity,decimals), classNameEvenRow + " right padding-left padding-right " + className, 1);
        } else {
          tableRow.addCell("", classNameEvenRow + " right padding-left padding-right " + className, 1);
        }
      }
      else if (columnsSelected[j] === "ReferenceUnit" || columnsSelected[j] === "referenceunit" || columnsSelected[j] === "mesure_unit") {
        tableRow.addCell(item.mesure_unit, classNameEvenRow + " center padding-left padding-right " + className, 1);
      }
      else if (columnsSelected[j] === "UnitPrice" || columnsSelected[j] === "unitprice" || columnsSelected[j] === "unit_price") {
        tableRow.addCell(Banana.Converter.toLocaleNumberFormat(item.unit_price.calculated_amount_vat_inclusive), classNameEvenRow + " right padding-left padding-right " + className, 1);
      }
      else if (columnsSelected[j] === "Amount" || columnsSelected[j] === "amount" || columnsSelected[j] === "total_amount_vat_inclusive") {
        tableRow.addCell(toInvoiceAmountFormat(invoiceObj, item.total_amount_vat_inclusive), classNameEvenRow + " right padding-left padding-right " + className, 1);
      }
      else {
        var userColumnValue = "";
        userColumnValue = getUserColumnValue(banDoc, invoiceObj.document_info.number, item.origin_row, columnsSelected[j]);
        tableRow.addCell(userColumnValue, classNameEvenRow + " padding-left padding-right " + className, 1);
      }
    }
  }

  tableRow = repTableObj.addRow();
  tableRow.addCell("", "thin-border-top", columnsNumber);

  //TOTAL ROUNDING DIFFERENCE
  if (invoiceObj.billing_info.total_rounding_difference.length) {
    tableRow = repTableObj.addRow();
    tableRow.addCell(texts.rounding, "padding-left padding-right", columnsNumber-1);
    tableRow.addCell(toInvoiceAmountFormat(invoiceObj, invoiceObj.billing_info.total_rounding_difference), "right padding-left padding-right", 1);
  }
  tableRow = repTableObj.addRow();
  tableRow.addCell("", "", columnsNumber);

  //FINAL TOTAL
  tableRow = repTableObj.addRow();
  tableRow.addCell(userParam.texts_total + " " + invoiceObj.document_info.currency, "total_cell", columnsNumber-1);
  tableRow.addCell(toInvoiceAmountFormat(invoiceObj, invoiceObj.billing_info.total_to_pay), "total_cell right", 1);
  
  tableRow = repTableObj.addRow();
  tableRow.addCell("", "", columnsNumber);

  //VAT INFO
  tableRow = repTableObj.addRow();
  var cellVatInfo = tableRow.addCell("", "padding-right right vat_info", columnsNumber);
  for (var i = 0; i < invoiceObj.billing_info.total_vat_rates.length; i++) {
    var vatInfo = texts.vat + " " + invoiceObj.billing_info.total_vat_rates[i].vat_rate + "%";
    vatInfo += " = " + toInvoiceAmountFormat(invoiceObj, invoiceObj.billing_info.total_vat_rates[i].total_vat_amount) + " " + invoiceObj.document_info.currency;
    cellVatInfo.addParagraph(vatInfo);
  }
  
  tableRow = repTableObj.addRow();
  tableRow.addCell("", "", columnsNumber);


  // Print QR Code
  if (userParam.qr_code_add) {
    print_qr_code(invoiceObj, texts, userParam, repTableObj);
  }
}

function print_qr_code(invoiceObj, texts, userParam, detailsTable) {

  /*
    Prints the QR Code
  */

  var repTableObj = detailsTable;
  var text = '';
  text += 'Currency:\n';
  text += invoiceObj.document_info.currency+'\n';
  text += 'Amount:\n';
  text += invoiceObj.billing_info.total_amount_vat_inclusive+'\n';
  text += 'VAT amount:\n';
  text += invoiceObj.billing_info.total_vat_amount+'\n';
  text += 'Account/Payable to:\n';
  text += invoiceObj.supplier_info.business_name+'\n';
  text += invoiceObj.supplier_info.address1+'\n';
  text += invoiceObj.supplier_info.postal_code+" "+invoiceObj.supplier_info.city+'\n';
  text += 'Reference:\n';
  text += '12 00000 00001 12345 67890 09876\n';
  text += 'Addidtional information:\n';
  text += 'Invoice:'+invoiceObj.document_info.number+"/Date:"+invoiceObj.document_info.date+"/Customer number:"+invoiceObj.customer_info.number+"/Payment:"+invoiceObj.billing_info.payment_term+'\n';
  // for (var i = 0; i < invoiceObj.items.length; i++) {
  //   text += 'Description:'+invoiceObj.items[i].description+'/Amount:'+invoiceObj.items[i].total_amount_vat_inclusive+'\n';
  // }
  text += 'Payable by:\n';

  // User has checked to use another address
  if (userParam.qr_code_use_different_address) {
    if (userParam.qr_code_address_row_1) {
      text += userParam.qr_code_address_row_1 + '\n';
    }
    if (userParam.qr_code_address_row_2) {
      text += userParam.qr_code_address_row_2 + '\n';
    }
    if (userParam.qr_code_address_row_3) {
      text += userParam.qr_code_address_row_3 + '\n';
    }
    if (userParam.qr_code_address_row_4) {
      text += userParam.qr_code_address_row_4 + '\n';
    }
  }
  else {
    // Invoice address is used
    text += invoiceObj.customer_info.first_name+ ' '+invoiceObj.customer_info.last_name+'\n';
    text += invoiceObj.customer_info.address1+'\n';
    text += invoiceObj.customer_info.postal_code+ ' '+invoiceObj.customer_info.city+'\n';
  }

  var qrCodeParam = {};
  qrCodeParam.errorCorrectionLevel = 'M';
  qrCodeParam.binaryCodingVersion = 25;
  qrCodeParam.border = 0;

  var qrCodeSvgImage = Banana.Report.qrCodeImage(text, qrCodeParam);
  if (qrCodeParam.errorMsg && qrCodeParam.errorMsg.length>0) {
    Banana.document.addMessage(qrCodeParam.errorMsg);
  }
  if (qrCodeSvgImage) {
    tableRow = repTableObj.addRow();
    var qrCodeCell = tableRow.addCell("","",columnsNumber);
    qrCodeCell.addParagraph(" ","");
    qrCodeCell.addImage(qrCodeSvgImage, 'qr_code');
    qrCodeCell.addParagraph(" ","");
    qrCodeCell.addParagraph(" ","");
  }
}

function print_final_texts(repDocObj, invoiceObj, detailsTable) {

  /*
    Prints all the texts (final texts, notes and greetings) after the invoice details
  */

  tableRow = detailsTable.addRow();
  tableRow.addCell(" ", "", columnsNumber);

  // Template params, default text starts with "(" and ends with ")" (default), (Vorderfiniert)
  if (invoiceObj.template_parameters && invoiceObj.template_parameters.footer_texts) {
    repDocObj.addParagraph(" ", "");
    var lang = '';
    if (invoiceObj.customer_info.lang) {
      lang = invoiceObj.customer_info.lang;
    }
    if (lang.length <= 0 && invoiceObj.document_info.locale) {
      lang = invoiceObj.document_info.locale;
    }
    var textDefault = [];
    var text = [];
    for (var i = 0; i < invoiceObj.template_parameters.footer_texts.length; i++) {
      var textLang = invoiceObj.template_parameters.footer_texts[i].lang;
      if (textLang.indexOf('(') === 0 && textLang.indexOf(')') === textLang.length-1) {
        textDefault = invoiceObj.template_parameters.footer_texts[i].text;
      }
      else if (textLang == lang) {
        text = invoiceObj.template_parameters.footer_texts[i].text;
      }
    }
    if (text.join().length <= 0) {
      text = textDefault;
    }
    for (var i=0; i < text.length; i++) {
      tableRow = detailsTable.addRow();
      var cellText = tableRow.addCell("","",columnsNumber);
      addMdBoldText(cellText, text[i]);
    }
  }

  // Notes
  repDocObj.addParagraph(" ","");
  for (var i = 0; i < invoiceObj.note.length; i++) {
    if (invoiceObj.note[i].description) {
      tableRow = detailsTable.addRow();
      var cellText = tableRow.addCell("","", columnsNumber);
      addMdBoldText(cellText, invoiceObj.note[i].description);
    }
  }

  // Greetings
  repDocObj.addParagraph(" ", "");
  if (invoiceObj.document_info.greetings) {
    tableRow = detailsTable.addRow();
    var cellText = tableRow.addCell("","",columnsNumber);
    addMdBoldText(cellText, invoiceObj.document_info.greetings);
  }
}

function print_footer(repDocObj, texts, userParam) {

  /*
    Prints the footer at the bottom of the page.
    Values "&[Page]", "&[Pagina]", "&[Seite]",.. are replaced with the page number.
    Values "&[Date]", "&[Data]", "&[Datum]",.. are replaced with the current day date.
    It is possible to add only one value in a row.
    It is possible to add more values on multiple rows.
    For empty value insert <none>.
  */

  if (userParam.footer_add) {
    var paragraph = repDocObj.getFooter().addParagraph("","footer_line");
    var tabFooter = repDocObj.getFooter().addTable("footer_table");
    var col1 = tabFooter.addColumn().setStyleAttributes("width:33%");
    var col2 = tabFooter.addColumn().setStyleAttributes("width:33%");
    var col3 = tabFooter.addColumn().setStyleAttributes("width:33%");

    var tableRow = tabFooter.addRow();
    var cell1 = tableRow.addCell("","",1);
    var cell2 = tableRow.addCell("","",1);
    var cell3 = tableRow.addCell("","",1);

    // footer left
    if (userParam.footer_left && userParam.footer_left.length > 0) {
      var lines = userParam.footer_left.split("\n");
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].indexOf("&["+texts.page+"]") > -1) {
          cell1.addParagraph(lines[i].replace("&["+texts.page+"]",""), "").addFieldPageNr();
        }
        else if (lines[i].indexOf("&["+texts.date+"]") > -1) {
          var date = new Date();
          date = Banana.Converter.toLocaleDateFormat(date);
          cell1.addParagraph(lines[i].replace("&["+texts.date+"]",date), "");
        }
        else {
          cell1.addParagraph(lines[i], "");
        }
      }
    }
    // footer center
    if (userParam.footer_center && userParam.footer_center.length > 0) {
      var lines = userParam.footer_center.split("\n");
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].indexOf("&["+texts.page+"]") > -1) {
          cell2.addParagraph(lines[i].replace("&["+texts.page+"]",""), "center").addFieldPageNr();
        }
        else if (lines[i].indexOf("&["+texts.date+"]") > -1) {
          var date = new Date();
          date = Banana.Converter.toLocaleDateFormat(date);
          cell2.addParagraph(lines[i].replace("&["+texts.date+"]",date), "center");
        }
        else {
          cell2.addParagraph(lines[i], "center");
        }
      }
    }
    // footer right
    if (userParam.footer_right && userParam.footer_right.length > 0) {
      var lines = userParam.footer_right.split("\n");
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].indexOf("&["+texts.page+"]") > -1) {
          cell3.addParagraph(lines[i].replace("&["+texts.page+"]",""), "right").addFieldPageNr();
        }
        else if (lines[i].indexOf("&["+texts.date+"]") > -1) {
          var date = new Date();
          date = Banana.Converter.toLocaleDateFormat(date);
          cell3.addParagraph(lines[i].replace("&["+texts.date+"]",date), "right");
        }
        else {
          cell3.addParagraph(lines[i], "right");
        }
      }
    }
  }
  else {
    var tabFooter = repDocObj.getFooter().addTable("footer_table");
    var tableRow = tabFooter.addRow();
    tableRow.addCell("","",1);
  }
}












//====================================================================//
// OTHER UTILITIES FUNCTIONS
//====================================================================//

function includeEmbeddedJavascriptFile(texts, userParam) {

  /*
    Include the javascript file (.js) entered by the user.
    User can define an embedded javascript file in the table Documents
    and use it to write his own 'hook' functions that overwrite the
    default functions.
  */


  // User entered a javascript file name
  // Take from the table documents all the javascript file names
  if (userParam.embedded_javascript_filename) {
    
    var jsFiles = [];
    
    // If Documents table exists, take all the ".js" file names
    var documentsTable = Banana.document.table("Documents");
    if (documentsTable) {
      for (var i = 0; i < documentsTable.rowCount; i++) {
        var tRow = documentsTable.row(i);
        var id = tRow.value("RowId");
        if (id.indexOf(".js") > -1) {
          jsFiles.push(id);
        }
      }
    }

    // Table documents contains javascript files
    if (jsFiles.length > 0) {

      // The javascript file name entered by user exists on documents table: include this file
      if (jsFiles.indexOf(userParam.embedded_javascript_filename) > -1) {
        try {
          Banana.include("documents:" + userParam.embedded_javascript_filename);
        }
        catch(error) {
          Banana.document.addMessage(texts.embedded_javascript_file_not_found);
        }
      }
    }
  }
}

function getUserColumnValue(banDoc, docInvoice, originRow, column) {

  /*
    Take the value from a custom user column of the table Transactions.
    User can add new custom columns on the Transactions table and include
    them into the invoice details table.
  */

  var table = banDoc.table('Transactions');
  var values = [];
  for (var i = 0; i < table.rowCount; i++) {
    var tRow = table.row(i);
    if (tRow.value('DocInvoice') === docInvoice && tRow.value(column)) {
      var rowNr = tRow.rowNr;
      if (rowNr.toString() === originRow.toString()) {
        values.push(tRow.value(column));
      }
    }
  }
  return values;
}

function toInvoiceAmountFormat(invoice, value) {

    /*
      Function used to convert all the amounts of the invoice
    */

    return Banana.Converter.toLocaleNumberFormat(value, invoice.document_info.decimals_amounts, true);
}

function getInvoiceAddress(invoiceAddress) {
  var address = "";
  if (invoiceAddress.courtesy) {
      address = invoiceAddress.courtesy + "\n";
  }
  if (invoiceAddress.first_name || invoiceAddress.last_name) {
    if (invoiceAddress.first_name) {
      address = address + invoiceAddress.first_name + " ";
    }
    if (invoiceAddress.last_name) {
      address = address + invoiceAddress.last_name;
    }
    address = address + "\n";
  }
  if (invoiceAddress.business_name) {
    address = address + invoiceAddress.business_name + "\n";
  }
  if (invoiceAddress.address1) {
    address = address + invoiceAddress.address1 + "\n";
  }
  if (invoiceAddress.address2) {
    address = address + invoiceAddress.address2 + "\n";
  }
  if (invoiceAddress.address3) {
    address = address + invoiceAddress.address3 + "\n";
  }
  if (invoiceAddress.postal_code) {
    address = address + invoiceAddress.postal_code + " ";
  }
  if (invoiceAddress.city) {
    address = address + invoiceAddress.city + "\n";
  }
  if (invoiceAddress.country) {
    address = address + invoiceAddress.country;
  }
  return address;
}

function getInvoiceSupplierName(invoiceSupplier) {
  var supplierName = "";
  if (invoiceSupplier.business_name) {
    supplierName = invoiceSupplier.business_name + "\n";
  }
  if (supplierName.length <= 0) {
    if (invoiceSupplier.first_name) {
      supplierName = invoiceSupplier.first_name + " ";
    }
    if (invoiceSupplier.last_name) {
      supplierName = supplierName + invoiceSupplier.last_name + "\n";
    }
  }
  return supplierName;
}

function getInvoiceSupplier(invoiceSupplier) {
  var supplierAddress = "";
  if (invoiceSupplier.address1) {
    supplierAddress = supplierAddress + invoiceSupplier.address1 + "\n";
  }
  if (invoiceSupplier.address2) {
    supplierAddress = supplierAddress + invoiceSupplier.address2 + "\n";
  }
  if (invoiceSupplier.postal_code) {
    supplierAddress = supplierAddress + invoiceSupplier.postal_code + " ";
  }
  if (invoiceSupplier.city) {
    supplierAddress = supplierAddress + invoiceSupplier.city + "\n";
  }
  if (invoiceSupplier.phone) {
    supplierAddress = supplierAddress + "Tel: " + invoiceSupplier.phone + "\n";
  }
  if (invoiceSupplier.fax) {
    supplierAddress = supplierAddress + "Fax: " + invoiceSupplier.fax + "\n";
  }
  if (invoiceSupplier.email) {
    supplierAddress = supplierAddress + invoiceSupplier.email + "\n";
  }
  if (invoiceSupplier.web) {
    supplierAddress = supplierAddress + invoiceSupplier.web + "\n";
  }
  if (invoiceSupplier.vat_number) {
    supplierAddress = supplierAddress + invoiceSupplier.vat_number;
  }
  return supplierAddress;
}

function getAddressLines(jsonAddress, fullAddress) {

  /*
    This function returns a complete address taken from the JSON
  */

   var address = [];
   address.push(jsonAddress["business_name"]);

   var addressName = [jsonAddress["first_name"], jsonAddress["last_name"]];
   addressName = addressName.filter(function(n){return n}); // remove empty items
   address.push(addressName.join(" "));

   address.push(jsonAddress["address1"]);
   if (fullAddress) {
      address.push(jsonAddress["address2"]);
      address.push(jsonAddress["address3"]);
   }

   var addressCity = [jsonAddress["postal_code"], jsonAddress["city"]].join(" ");
   if (jsonAddress["country_code"] && jsonAddress["country_code"] !== "CH")
      addressCity = [jsonAddress["country_code"], addressCity].join(" - ");
   address.push(addressCity);

   address = address.filter(function(n){return n}); // remove empty items

   return address;
}

function getTitle(invoiceObj, texts, userParam) {

  /*
    Returns the title based on the DocType value (10=Invoice, 12=Credit note)
    By default are used these values.
    User can enter a different text and use it.
    User can enter "<none>" and none title is printed.
  */

  var documentTitle = "";
  if (invoiceObj.document_info.title) {  
    documentTitle = invoiceObj.document_info.title;
  }
  else {
    if (invoiceObj.document_info.doc_type && invoiceObj.document_info.doc_type === "10") {
      documentTitle = texts.invoice;
      if (userParam.title_doctype_10 && userParam.title_doctype_10 !== "<none>") {
        documentTitle = userParam.title_doctype_10;
      } else {
        documentTitle = "";
      }
    }
    if (invoiceObj.document_info.doc_type && invoiceObj.document_info.doc_type === "12") {
      documentTitle = texts.credit_note;
      if (userParam.title_doctype_12 && userParam.title_doctype_12 !== "<none>") {
        documentTitle = userParam.title_doctype_12;
      } else {
        documentTitle = "";
      }
    }
  }
  return documentTitle;
}

function addMdBoldText(reportElement, text) {
    
    /*
    * Applies the bold style to a text.
    * It is used the Markdown syntax.
    *
    * Use '**' characters where the bold starts and ends.
    * - set bold all the paragraph => **This is bold paragraph
    *                              => **This is bold paragraph**
    *
    * - set bold single/multiple words => This is **bold** text
    *                                  => This **is bold** text
    *                                  => **This** is **bold** text
    */

    var p = reportElement.addParagraph();
    var printBold = false;
    var startPosition = 0;
    var endPosition = -1;

    do {
        endPosition = text.indexOf("**", startPosition);
        var charCount = endPosition === -1 ? text.length - startPosition : endPosition - startPosition;
        if (charCount > 0) {
            var span = p.addText(text.substr(startPosition, charCount), "");
            if (printBold)
                span.setStyleAttribute("font-weight", "bold");
        }
        printBold = !printBold;
        startPosition = endPosition >= 0 ? endPosition + 2 : text.length;
    } while (startPosition < text.length && endPosition >= 0);
}

















//====================================================================//
// STYLES
//====================================================================//

function replaceVariables(cssText, cssVariables) {

  /* 
    Function that replaces all the css variables inside of the given cssText with their values.
    All the css variables start with "$" (i.e. $font_size, $margin_top)
  */

  var result = "";
  var varName = "";
  var insideVariable = false;
  var variablesNotFound = [];

  //Banana.console.log(">>STRING TO REPLACE: " + cssText);
  for (var i = 0; i < cssText.length; i++) {
    
    var currentChar = cssText[i];

    if (currentChar === "$") {
      insideVariable = true;
      varName = currentChar;
    }
    else if (insideVariable) {
      if (currentChar.match(/^[0-9a-z]+$/) || currentChar === "_" || currentChar === "-") {
        // still a variable name
        varName += currentChar;
      } 
      else {
        // end variable, any other charcter
        
        if (!(varName in cssVariables)) {
          variablesNotFound.push(varName);
          result += varName;
        }
        else {
          result += cssVariables[varName];
        }
        
        result += currentChar;
        insideVariable = false;
        //Banana.console.log(">>VARNAME (A): " + varName);
        varName = "";
      }
    }
    else {
      result += currentChar;
    }
  }

  if (insideVariable) {
    // end of text, end of variable

    if (!(varName in cssVariables)) {
      variablesNotFound.push(varName);
      result += varName;
    }
    else {
      result += cssVariables[varName];
    }

    insideVariable = false;
    //Banana.console.log(">>VARNAME (B): " + varName);
  }

  if (variablesNotFound.length > 0) {
    //Banana.console.log(">>VARIABLESNOTFOUND :" + variablesNotFound);
  }

  //Banana.console.log(">>RESULT: " + result+ "\n");
  return result;
}

function set_css_variables(cssVariables, userParam) {

  /* 
    Sets the values of all the css variables.
  */

  cssVariables.$background_color_1 = userParam.background_color_1;
  cssVariables.$background_color_2 = userParam.background_color_2;
  cssVariables.$color = userParam.color;
  cssVariables.$font_family = userParam.font_family;
  cssVariables.$font_size = userParam.font_size+"pt";
  cssVariables.$font_size_sender_address = "7pt";
  cssVariables.$font_size_title = parseInt(userParam.font_size)+4 +"pt";
  cssVariables.$font_size_total = parseInt(userParam.font_size)+2 +"pt";
  cssVariables.$font_size_footer = "8pt";
  
  cssVariables.$margin_right = "10mm";
  cssVariables.$margin_left = "20mm";
  
  cssVariables.$margin_top_info = "45mm";
  cssVariables.$margin_left_info = "113mm";
  cssVariables.$margin_top_header = "10mm";
  cssVariables.$margin_top_shipping_address = "75mm";
  cssVariables.$margin_top_text_begin = "120mm";
  cssVariables.$margin_left_details = "23mm";
  cssVariables.$margin_top_details = "140mm";
  cssVariables.$margin_bottom_footer = "20mm";

  cssVariables.$padding_right = "5px";
  cssVariables.$padding_left = "5px";
  cssVariables.$padding_top = "0px";
  cssVariables.$padding_bottom = "0px";
  cssVariables.$padding = "3px";
  cssVariables.$text_align_qrcode = userParam.qr_code_align;
  cssVariables.$text_align_header = "right";
  cssVariables.$text_align_sender_address = "center";
  cssVariables.$border_bottom_sender_address = "1px solid black";
  cssVariables.$border_bottom_total = "1px double";
  cssVariables.$border_top_footer = "thin solid";
  
  /* If exists use the function defined by the user */
  if (typeof(hook_set_css_variables) === typeof(Function)) {
    hook_set_css_variables(cssVariables, userParam);
  }
}

function set_invoice_style(reportObj, repStyleObj, cssVariables, userParam) {

  /*
    Sets the invice style using the css variables.
  */

  // Set the stylesheet
  if (!repStyleObj) {
    repStyleObj = reportObj.newStyleSheet();
  }

  var style = "";

  // style = "counter-reset: page";
  // style = replaceVariables(style, cssVariables);
  // repStyleObj.addStyle(".pageReset", style);

  style = "font-size:$font_size; font-family:$font_family";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle("body", style);

  style = "text-align:right";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".right", style);

  style = "text-align:center";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".center", style);

  style = "font-weight:bold";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".bold", style);

  style = "font-weight:bold; color:$background_color_1; border-bottom:$border_bottom_total $background_color_1; font-size:$font_size_total";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".total_cell", style);

  style = "font-weight:bold; background-color:$background_color_1; color:$color; padding:5px";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".subtotal_cell",style);

  style = "font-size:$font_size";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".vat_info", style);

  style = "background-color:$background_color_2";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".even_rows_background_color", style);

  style = "border-bottom:2px solid $background_color_1";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".border-bottom", style);

  style = "border-top:thin solid $background_color_1";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".thin-border-top", style);

  style = "padding-right:$padding_right";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".padding-right", style);

  style = "padding-left:$padding_left";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".padding-left", style);

  style = "position:absolute; margin-top:$margin_top_header; margin-left:$margin_left; margin-right:$margin_right";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".header_left_text", style);

  style = "position:absolute; margin-top:$margin_top_header; margin-left:$margin_left; margin-right:$margin_right; text-align:$text_align_header";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".header_right_text", style);

  style = "position:absolute; margin-top:$margin_top_header; margin-left:$margin_left; margin-right:$margin_right";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".logo", style);

  style = "position:absolute; margin-top:$margin_top_info; margin-left:$margin_left; margin-right:$margin_right; font-size:$font_size";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".info_table_left", style);

  style = "padding-top:$padding_top; padding-bottom:$padding_bottom";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle("table.info_table_left td", style);

  style = "position:absolute; margin-top:$margin_top_info; margin-left:$margin_left_info; margin-right:$margin_right; font-size:$font_size";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".info_table_right", style);

  style = "padding-top:$padding_top; padding-bottom:$padding_bottom";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle("table.info_table_right td", style);

  style = "position:absolute; margin-top:$margin_top_info; margin-left:$margin_left; margin-right:$margin_right; font-size:$font_size";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".info_table_row0", style);

  style = "padding-top:$padding_top; padding-bottom:$padding_bottom";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle("table.info_table_row0 td", style);

  style = "display:none";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle("@page:first-view table.info_table_row0", style);

  style = "position:absolute; margin-top:$margin_top_info; margin-left:$margin_left_info; margin-right:$margin_right; font-size:$font_size";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".address_table_right", style);

  style = "position:absolute; margin-top:$margin_top_info; margin-left:$margin_left; margin-right:$margin_right";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".address_table_left", style);

  style = "text-align:$text_align_sender_address; font-size:$font_size_sender_address; border-bottom:$border_bottom_sender_address"; 
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".small_address", style);

  style = "position:absolute; margin-top:$margin_top_shipping_address; margin-left:$margin_left; margin-right:$margin_right; font-size:$font_size";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".shipping_address", style);

  style = "font-size:$font_size_title; font-weight:bold; color:$background_color_1";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".title_text", style);

  style = "position:absolute; margin-top:$margin_top_text_begin; margin-left:$margin_left_details; margin-right:$margin_right; width:100%;";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".begin_text_table", style);

  style = "font-size:$font_size"; 
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".begin_text", style);

  style = "margin-top:$margin_top_details; margin-left:$margin_left_details; margin-right:$margin_right; font-size:$font_size; width:100%";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".doc_table", style);

  style = "font-weight:bold; background-color:$background_color_1; color:$color";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".doc_table_header", style);

  style = "padding:$padding";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".doc_table_header td", style);

  style = "text-align:$text_align_qrcode";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".qr_code", style);

  style = "margin-left:$margin_left; margin-right:$margin_right; border-top:$border_top_footer $background_color_1";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".footer_line", style);

  style = "margin-bottom:$margin_bottom_footer; margin-left:$margin_left; margin-right:$margin_right; width:100%; font-size:$font_size_footer";
  style = replaceVariables(style, cssVariables);
  repStyleObj.addStyle(".footer_table", style);




  /* Uncomment to show all the borders of the tables */

  /*
    repStyleObj.addStyle("table.info_table_left td", "border: thin solid black;");
    repStyleObj.addStyle("table.info_table_right td", "border: thin solid black");
    repStyleObj.addStyle("table.info_table_row0 td", "border: thin solid black");
    repStyleObj.addStyle("table.address_table_right td", "border: thin solid black");
    repStyleObj.addStyle("table.address_table_left td", "border: thin solid black");
    repStyleObj.addStyle("table.shipping_address td", "border: thin solid black;");
    repStyleObj.addStyle("table.begin_text_table td", "border: thin solid black;");
    repStyleObj.addStyle("table.doc_table td", "border: thin solid black;");
    repStyleObj.addStyle("table.footer_table td", "border: thin solid black");
  */


  /* If exists use the function defined by the user */
  if (typeof(hook_set_invoice_style) === typeof(Function)) {
    hook_set_invoice_style(repStyleObj, cssVariables, userParam);
  }
}














//====================================================================//
// TEXTS
//====================================================================//

function setInvoiceTexts(language) {

  /*
    Defines all the texts translations for all the different languages.
  */

  var texts = {};
  
  //Banana.console.log(language);


  if (language === 'it') {
    //Address
    texts.shipping_address = "Indirizzo spedizione";

    //Info
    texts.invoice = 'Fattura';
    texts.date = 'Data';
    texts.customer = 'No cliente';
    texts.vat_number = 'No IVA';
    texts.fiscal_number = 'No fiscale';
    texts.payment_due_date_label = 'Scadenza';
    texts.payment_terms_label = 'Pagamento';
    texts.page = 'Pagina';
    texts.credit_note = 'Nota di credito';

    //Details
    texts.description = 'Description';
    texts.quantity = 'Quantity';
    texts.reference_unit = 'ReferenceUnit';
    texts.unit_price = 'UnitPrice';
    texts.amount = 'Amount';
    texts.totalnet = 'Totale netto';
    texts.vat = 'IVA';
    texts.rounding = 'Arrotondamento';
    texts.total = 'TOTALE';
    
    //Include
    texts.param_include = "Stampa";
    texts.param_header_include = "Intestazione";
    texts.param_header_left = "Intestazione a sinistra";
    texts.param_header_print = 'Intestazione pagina';
    texts.param_header_row_1 = "Intestazione riga 1";
    texts.param_header_row_2 = "Intestazione riga 2";
    texts.param_header_row_3 = "Intestazione riga 3";
    texts.param_header_row_4 = "Intestazione riga 4";
    texts.param_header_row_5 = "Intestazione riga 5";
    texts.param_logo_print = 'Logo';
    texts.param_logo_name = 'Nome logo';
    texts.param_address_include = "Indirizzo cliente";
    texts.param_address_small_line = "Riga indirizzo mittente";
    texts.param_address_left = 'Indirizzo a sinistra';
    texts.param_shipping_address = 'Indirizzo spedizione';
    texts.param_info_include = 'Informazioni';
    texts.param_info_invoice_number = 'Numero fattura';
    texts.param_info_date = 'Data fattura';
    texts.param_info_customer = 'Numero cliente';
    texts.param_info_customer_vat_number = 'Numero IVA cliente';
    texts.param_info_customer_fiscal_number = 'Numero fiscale cliente';
    texts.param_info_due_date = 'Scadenza fattura';
    texts.param_info_page = 'Numero pagina';
    texts.param_details_include = "Dettagli";
    texts.param_details_columns = "Colonne dettagli fattura";
    texts.param_details_columns_widths = "Larghezza colonne dettagli fattura";
    texts.param_details_gross_amounts = "Dettagli con importi lordi (IVA inclusa)";
    texts.param_footer_include = 'Piè di pagina';
    texts.param_footer_add = 'Stampa piè di pagina';
    texts.param_footer_left = "Testo sinistra";
    texts.param_footer_center = "Testo centro";
    texts.param_footer_right = "Testo destra";
    texts.param_qr_code = "Codice QR";
    texts.param_qr_code_add = "Stampa codice QR";
    texts.param_qr_code_align = "Allineamento (left=sinistra, center=centro, right=destra)";
    texts.param_qr_code_use_different_address = "Usa un indirizzo alternativo";
    texts.param_qr_code_address_row_1 = "Indirizzo alternativo riga 1";
    texts.param_qr_code_address_row_2 = "Indirizzo alternativo riga 2";
    texts.param_qr_code_address_row_3 = "Indirizzo alternativo riga 3";
    texts.param_qr_code_address_row_4 = "Indirizzo alternativo riga 4";

    //Texts
    texts.param_texts = "Testi (vuoto = valori predefiniti)";
    texts.param_language_add = "Aggiungi nuova lingua";
    texts.param_language_remove = "Rimuovi lingua";
    texts.param_text_language_code = "it";
    texts.param_text_info_invoice_number = 'Numero fattura';
    texts.param_text_info_date = 'Data fattura';
    texts.param_text_info_customer = 'Numero cliente';
    texts.param_text_info_customer_vat_number = 'Numero IVA cliente';
    texts.param_text_info_customer_fiscal_number = 'Numero fiscale cliente';
    texts.param_text_info_due_date = 'Scadenza fattura';
    texts.param_text_info_page = 'Numero pagina';
    texts.param_text_shipping_address = 'Indirizzo spedizione';
    texts.param_text_title_doctype_10 = "Titolo fattura (DocType=10)";
    texts.param_text_title_doctype_12 = "Titolo nota di credito (DocType=12)";
    texts.param_text_details_columns = 'Nomi colonne dettagli fattura';
    texts.param_text_total = 'Totale fattura';

    //Styles
    texts.param_styles = "Stili";
    texts.param_background_color_1 = 'Colore sfondo';
    texts.param_color = 'Colore testo';
    texts.param_background_color_2 = 'Colore sfondo righe';
    texts.param_font_family = 'Tipo carattere';
    texts.param_font_size = 'Dimensione carattere';

    //Embedded JavaScript file
    texts.embedded_javascript_file_not_found = "File JavaScript non trovato o non valido";
    texts.param_embedded_javascript = "File JavaScript";
    texts.param_embedded_javascript_filename = "Inserisci nome file (colonna 'ID' tabella Documenti)";

    //Tooltips for the parameters
    texts.param_tooltip_header_print = "Vista per includere l'intestazione della pagina";
    texts.param_tooltip_header_left = "Vista per stampare l'intestazione a sinistra";
    texts.param_tooltip_logo_print = "Vista per includere il logo";
    texts.param_tooltip_logo_name = "Inserisci il nome del logo";
    texts.param_tooltip_info_invoice_number = "Vista per includere il numero della fattura";
    texts.param_tooltip_info_date = "Vista per includere la data della fattura";
    texts.param_tooltip_info_customer = "Vista per includere il numero cliente della fattura";
    texts.param_tooltip_info_customer_vat_number = "Vista per includere il numero IVA del cliente";
    texts.param_tooltip_info_customer_fiscal_number = "Vista per includere il numero fiscale del cliente";
    texts.param_tooltip_info_due_date = "Vista per includere la data di scadenza della fattura";
    texts.param_tooltip_info_page = "Vista per includere il numero di pagina";
    texts.param_tooltip_language_add = "Inserisci una nuova lingua (ad es. 'es' per spagnolo)";
    texts.param_tooltip_language_remove = "Inserisci la lingua che vuoi rimuovere (ad es. 'es' per rimuovere lo spagnolo)";
    texts.param_tooltip_text_info_invoice_number = "Inserisci un testo per sostituire quello predefinito";
    texts.param_tooltip_text_info_date = "Inserisci un testo per sostituire quello predefinito";
    texts.param_tooltip_text_info_customer = "Inserisci un testo per sostituire quello predefinito";
    texts.param_tooltip_texts_payment_terms_label = "Inserisci un testo per sostituire quello predefinito";
    texts.param_tooltip_text_info_page = "Inserisci un testo per sostituire quello predefinito";
    texts.param_tooltip_title_doctype_10 = "Inserisci un testo per sostituire quello predefinito";
    texts.param_tooltip_title_doctype_12 = "Inserisci un testo per sostituire quello predefinito";
    texts.param_tooltip_texts_total = "Inserisci un testo per sostituire quello predefinito";
    texts.param_tooltip_text_details_columns = "Inserisci i nomi delle colonne dei dettagli fattura";
    texts.param_tooltip_details_columns = "Inserisci i nomi XML delle colonne dei dettagli nell'ordine che preferisci";
    texts.param_tooltip_details_columns_widths = "Inserisci le larghezze delle colonne dei dettagli in % (la somma deve essere 100%)";
    texts.param_tooltip_header_row_1 = "Inserisci un testo per sostituire quello predefinito";
    texts.param_tooltip_header_row_2 = "Inserisci un testo per sostituire quello predefinito";
    texts.param_tooltip_header_row_3 = "Inserisci un testo per sostituire quello predefinito";
    texts.param_tooltip_header_row_4 = "Inserisci un testo per sostituire quello predefinito";
    texts.param_tooltip_header_row_5 = "Inserisci un testo per sostituire quello predefinito";
    texts.param_tooltip_address_small_line = "Inserisci l'indirizzo del mittente in una riga subito sopra all'indirizzo del cliente";
    texts.param_tooltip_shipping_address = "Vista per stampare l'indirizzo di spedizione";
    texts.param_tooltip_address_left = "Vista per stampare l'indirizzo del cliente a sinistra";
    texts.param_tooltip_details_gross_amounts = "Vista per stampare i dettagli della fattura con importi al lordo con IVA inclusa";
    texts.param_tooltip_footer_add = "Check to print the footer at the bottom of the page";
    texts.param_tooltip_footer = "Inserisci il testo piè di pagina";
    texts.param_tooltip_font_family = "Inserisci il tipo di carattere (ad es. Arial, Helvetica, Times New Roman, ...)";
    texts.param_tooltip_font_size = "Inserisci la dimensione del carattere (ad es. 10, 11, 12, ...)";
    texts.param_tooltip_background_color_1 = "Inserisci il colore dello sfondo (ad es. '#337ab7' oppure 'Blue')";
    texts.param_tooltip_color = "Inserisci il colore del testo (ad es. '#ffffff' oppure 'White')";
    texts.param_tooltip_background_color_2 = "Inserisci il colore per lo sfondo delle rige dettagli fattura (ad es. '#F0F8FF' oppure 'LightSkyBlue')";
    texts.param_tooltip_javascript_filename = "Inserisci il nome del file JavaScript (.js) preso dalla colonna 'ID' della tabella Documenti (ad es. File.js)";
    texts.param_tooltip_qr_code_add = "Vista per stampare il codice QR";
    texts.param_tooltip_qr_code_align = "Scegli dove stampare il codice QR";
    texts.param_tooltip_qr_code_use_different_address = "Vista per usare un indirizzo diverso nel codice QR";
    texts.param_tooltip_qr_code_address_row_1 = "Inserisci il testo della riga 1";
    texts.param_tooltip_qr_code_address_row_2 = "Inserisci il testo della riga 2";
    texts.param_tooltip_qr_code_address_row_3 = "Inserisci il testo della riga 3";
    texts.param_tooltip_qr_code_address_row_4 = "Inserisci il testo della riga 4";

  }
  else if (language === 'de') {
    texts.customer = 'Kunden-Nr';
    texts.date = 'Datum';
    texts.description = 'Beschreibung';
    texts.invoice = 'Rechnung';
    texts.page = 'Seite';
    texts.rounding = 'Rundung';
    texts.total = 'Total';
    texts.totalnet = 'Netto-Betrag';
    texts.vat = 'MwSt.';
    texts.qty = 'Menge';
    texts.unit_ref = 'Einheit';
    texts.unit_price = 'Preiseinheit';
    // texts.vat_number = 'Mehrwertsteuernummer: ';
    // texts.bill_to = 'Rechnungsadresse';
    // texts.shipping_to = 'Lieferadresse';
    // texts.from = 'VON:';
    // texts.to = 'ZU:';
    texts.param_background_color_1 = 'Hintergrundfarbe';
    texts.param_color = 'Textfarbe';
    texts.param_font_family = 'Typ Schriftzeichen';
    // texts.param_image_height = 'Bildhöhe (mm)';
    texts.param_header_print = 'Seitenüberschrift einschliessen';
    texts.param_logo_print = 'Logo ausdrucken';
    texts.payment_due_date_label = 'Fälligkeitsdatum';
    texts.payment_terms_label = 'Zahlungsfrist';
    //texts.param_max_items_per_page = 'Anzahl der Zeilen auf jeder Rechnung';
  }
  else if (language === 'fr') {
    texts.customer = 'No Client';
    texts.date = 'Date';
    texts.description = 'Description';
    texts.invoice = 'Facture';
    texts.page = 'Page';
    texts.rounding = 'Arrondi';
    texts.total = 'Total';
    texts.totalnet = 'Total net';
    texts.vat = 'TVA';
    texts.qty = 'Quantité';
    texts.unit_ref = 'Unité';
    texts.unit_price = 'Prix unité';
    // texts.vat_number = 'Numéro de TVA: ';
    // texts.bill_to = 'Adresse de facturation';
    // texts.shipping_to = 'Adresse de livraison';
    // texts.from = 'DE:';
    // texts.to = 'À:';
    texts.param_background_color_1 = 'Couleur de fond';
    texts.param_color = 'Couleur du texte';
    texts.param_font_family = 'Police de caractère';
    // texts.param_image_height = "Hauteur de l'image (mm)";
    texts.param_header_print = 'Inclure en-tête de page';
    texts.param_logo_print = 'Imprimer logo';
    texts.payment_due_date_label = 'Echéance';
    texts.payment_terms_label = 'Paiement';
    //texts.param_max_items_per_page = 'Nombre d’éléments sur chaque facture';
  }
  else if (language === 'zh') {
    texts.customer = '客户编号';
    texts.date = '日期';
    texts.description = '摘要';
    texts.invoice = '发票';
    texts.page = '页数';
    texts.rounding = '四舍五入';
    texts.total = '总计';
    texts.totalnet = '总净值';
    texts.vat = '增值税';
    texts.qty = '数量';
    texts.unit_ref = '单位';
    texts.unit_price = '单价';
    // texts.vat_number = '增值税号: ';
    // texts.bill_to = '账单地址';
    // texts.shipping_to = '邮寄地址';
    texts.from = '来自:';
    texts.to = '至:';
    texts.param_background_color_1 = '背景色';
    texts.param_color = '文本颜色';
    texts.param_font_family = '字体类型';
    texts.param_image_height = '图像高度 (mm)';
    texts.param_header_print = '包括页眉';
    texts.param_logo_print = '打印徽标';
    texts.payment_due_date_label = '截止日期';
    texts.payment_terms_label = '付款';
    //texts.param_max_items_per_page = '每页上的项目数';
  }
  else if (language === 'nl') {
    texts.customer = 'Klantennummer';
    texts.date = 'Datum';
    texts.description = 'Beschrijving';
    texts.invoice = 'Factuur';
    texts.page = 'Pagina';
    texts.rounding = 'Afronding';
    texts.total = 'Totaal';
    texts.totalnet = 'Totaal netto';
    texts.vat = 'BTW';
    texts.qty = 'Hoeveelheid';
    texts.unit_ref = 'Eenheid';
    texts.unit_price = 'Eenheidsprijs';
    // texts.vat_number = 'BTW-nummer: ';
    // texts.bill_to = 'Factuuradres';
    // texts.shipping_to = 'Leveringsadres';
    // texts.from = 'VAN:';
    // texts.to = 'TOT:';
    texts.param_background_color_1 = 'Achtergrond kleur';
    texts.param_color = 'tekstkleur';
    texts.param_font_family = 'Lettertype';
    texts.param_image_height = 'Beeldhoogte (mm)';
    texts.param_header_print = 'Pagina-koptekst opnemen';
    texts.param_logo_print = 'Druklogo';
    texts.payment_due_date_label = 'Vervaldatum';
    texts.payment_terms_label = 'Betaling';
    //texts.param_max_items_per_page = 'Aantal artikelen op iedere pagina';
  }
  else {

    //Address
    texts.shipping_address = "Shipping address";

    //Info
    texts.invoice = 'Invoice';
    texts.date = 'Date';
    texts.customer = 'Customer No';
    texts.vat_number = 'VAT number';
    texts.fiscal_number = 'Fiscal number';
    texts.payment_due_date_label = 'Due date';
    texts.payment_terms_label = 'Payment';
    texts.page = 'Page';
    texts.credit_note = 'Credit note';

    //Details
    texts.description = 'Description';
    texts.quantity = 'Quantity';
    texts.reference_unit = 'ReferenceUnit';
    texts.unit_price = 'UnitPrice';
    texts.amount = 'Amount';
    texts.totalnet = 'Total net';
    texts.vat = 'VAT';
    texts.rounding = 'Rounding';
    texts.total = 'TOTAL';
    
    //Include
    texts.param_include = "Print";
    texts.param_header_include = "Header";
    texts.param_header_left = "Header on left position";
    texts.param_header_print = 'Page header';
    texts.param_header_row_1 = "Header row 1";
    texts.param_header_row_2 = "Header row 2";
    texts.param_header_row_3 = "Header row 3";
    texts.param_header_row_4 = "Header row 4";
    texts.param_header_row_5 = "Header row 5";
    texts.param_logo_print = 'Logo';
    texts.param_logo_name = 'Logo name';
    texts.param_address_include = "Customer address";
    texts.param_address_small_line = "Sender address line";
    texts.param_address_left = 'Address on left position';
    texts.param_shipping_address = 'Shipping address';
    texts.param_info_include = 'Info';
    texts.param_info_invoice_number = 'Invoice number';
    texts.param_info_date = 'Invoice date';
    texts.param_info_customer = 'Customer number';
    texts.param_info_customer_vat_number = 'Customer VAT number';
    texts.param_info_customer_fiscal_number = 'Customer fiscal number';
    texts.param_info_due_date = 'Invoice due date';
    texts.param_info_page = 'Invoice page number';
    texts.param_details_include = "Details";
    texts.param_details_columns = "Invoice details columns";
    texts.param_details_columns_widths = "Invoice details columns width";
    texts.param_details_gross_amounts = "Details with gross amounts (VAT included)";
    texts.param_footer_include = 'Footer';
    texts.param_footer_add = 'Print footer';
    texts.param_footer_left = "Left text";
    texts.param_footer_center = "Center text";
    texts.param_footer_right = "Right text";
    texts.param_qr_code = "QR Code";
    texts.param_qr_code_add = "Print the QR Code";
    texts.param_qr_code_align = "Alignment (left, center or right)";
    texts.param_qr_code_use_different_address = "Use an alternative address";
    texts.param_qr_code_address_row_1 = "Alternative address row 1";
    texts.param_qr_code_address_row_2 = "Alternative address row 2";
    texts.param_qr_code_address_row_3 = "Alternative address row 3";
    texts.param_qr_code_address_row_4 = "Alternative address row 4";

    //Texts
    texts.param_texts = "Texts (empty = default values)";
    texts.param_language_add = "Add a new language";
    texts.param_language_remove = "Remove language";
    texts.param_text_language_code = "en";
    texts.param_text_info_invoice_number = 'Invoice number';
    texts.param_text_info_date = 'Invoice date';
    texts.param_text_info_customer = 'Invoice customer number';
    texts.param_text_info_customer_vat_number = 'Customer VAT number';
    texts.param_text_info_customer_fiscal_number = 'Customer fiscal number';
    texts.param_text_info_due_date = 'Invoice due date';
    texts.param_text_info_page = 'Invoice page number';
    texts.param_text_shipping_address = 'Shipping address';
    texts.param_text_title_doctype_10 = "Title invoice (DocType=10)";
    texts.param_text_title_doctype_12 = "Title credit note (DocType=12)";
    texts.param_text_details_columns = 'Invoice details columns names';
    texts.param_text_total = 'Invoice total';

    //Styles
    texts.param_styles = "Styles";
    texts.param_background_color_1 = 'Background Color';
    texts.param_color = 'Text Color';
    texts.param_background_color_2 = 'Rows background color';
    texts.param_font_family = 'Font type';
    texts.param_font_size = 'Font size';

    //Embedded JavaScript file
    texts.embedded_javascript_file_not_found = "Custom Javascript file not found or not valid";
    texts.param_embedded_javascript = "Custom JavaScript file";
    texts.param_embedded_javascript_filename = "Insert the file name ('ID' column of the table Documents)";

    //Tooltips for the parameters
    texts.param_tooltip_header_print = "Check to include the page header";
    texts.param_tooltip_header_left = "Check to print the header on left position";
    texts.param_tooltip_logo_print = "Check to include the logo";
    texts.param_tooltip_logo_name = "Enter the name of the logo";
    texts.param_tooltip_info_invoice_number = "Check to include the invoice number";
    texts.param_tooltip_info_date = "Check to include the invoice date";
    texts.param_tooltip_info_customer = "Check to include the invoice customer number";
    texts.param_tooltip_info_customer_vat_number = "Check to include the customer VAT number";
    texts.param_tooltip_info_customer_fiscal_number = "Check to include the customer fiscal number";
    texts.param_tooltip_info_due_date = "Check to include the invoice due date";
    texts.param_tooltip_info_page = "Check to include the page invoice number";
    texts.param_tooltip_language_add = "Enter a new language (i.e. 'es' for spanish)";
    texts.param_tooltip_language_remove = "Enter the languages you want to remove (i.e. 'es' to remove spanish)";
    texts.param_tooltip_text_info_invoice_number = "Enter a text to replace the default one";
    texts.param_tooltip_text_info_date = "Enter a text to replace the default one";
    texts.param_tooltip_text_info_customer = "Enter a text to replace the default one";
    texts.param_tooltip_texts_payment_terms_label = "Enter a text to replace the default one";
    texts.param_tooltip_text_info_page = "Enter a text to replace the default one";
    texts.param_tooltip_title_doctype_10 = "Enter a text to replace the default one";
    texts.param_tooltip_title_doctype_12 = "Enter a text to replace the default one";
    texts.param_tooltip_texts_total = "Enter a text to replace the default one";
    texts.param_tooltip_text_details_columns = "Enter the names of the invoice details columns";
    texts.param_tooltip_details_columns = "Enter the XML names of the columns in the order you prefer";
    texts.param_tooltip_details_columns_widths = "Enter the width of the columns in % (sum = 100%)";
    texts.param_tooltip_header_row_1 = "Enter a text to replace the default one";
    texts.param_tooltip_header_row_2 = "Enter a text to replace the default one";
    texts.param_tooltip_header_row_3 = "Enter a text to replace the default one";
    texts.param_tooltip_header_row_4 = "Enter a text to replace the default one";
    texts.param_tooltip_header_row_5 = "Enter a text to replace the default one";
    texts.param_tooltip_address_small_line = "Enter supplier address line above the customer address";
    texts.param_tooltip_shipping_address = "Check to print the shipping address";
    texts.param_tooltip_address_left = "Check to print the customer address on left position";
    texts.param_tooltip_details_gross_amounts = "Check to print the invoice details with gross amounts with the VAT included";
    texts.param_tooltip_footer_add = "Check to print the footer at the bottom of the page";
    texts.param_tooltip_footer = "Enter a footer text";
    texts.param_tooltip_font_family = "Enter the font type (i.e. Arial, Helvetica, Times New Roman, ...)";
    texts.param_tooltip_font_size = "Enter the font size (i.e. 10, 11, 12, ...)";
    texts.param_tooltip_background_color_1 = "Enter the background color (i.e. '#337ab7' or 'Blue')";
    texts.param_tooltip_color = "Enter the text color (i.e. '#ffffff' or 'White')";
    texts.param_tooltip_background_color_2 = "Enter the color for the rows background of the details (i.e. '#F0F8FF' or 'LightSkyBlue')";
    texts.param_tooltip_javascript_filename = "Enter the name of the javascript file taken from the 'ID' column of the table 'Documents' (i.e. file.js)";
    texts.param_tooltip_qr_code_add = "Check to print the QR Code";
    texts.param_tooltip_qr_code_align = "Choose where to print the QR Code";
    texts.param_tooltip_qr_code_use_different_address = "Check to use a different address for the QR Code";
    texts.param_tooltip_qr_code_address_row_1 = "Enter the row 1 text";
    texts.param_tooltip_qr_code_address_row_2 = "Enter the row 2 text";
    texts.param_tooltip_qr_code_address_row_3 = "Enter the row 3 text";
    texts.param_tooltip_qr_code_address_row_4 = "Enter the row 4 text";

  }
  return texts;
}


