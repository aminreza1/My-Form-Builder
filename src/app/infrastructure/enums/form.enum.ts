export enum FieldType {
    number= "number",
    string = "string", 
    text = "text",
    html = "html", 
    date = "date", 
    period = "period",
    select = "select",
    radio = "radio",
    check = "check"
  }

  export const FieldTypeToOptionMapper : Record<FieldType, string> = {
    [FieldType.number]: "Number",
    [FieldType.string]: "String",
    [FieldType.text]: "Text content",
    [FieldType.html]: "HTML content",
    [FieldType.date]: "Date Picker",
    [FieldType.period]: "Period of date",
    [FieldType.select]: "Select a value",
    [FieldType.radio]: "Radio button",
    [FieldType.check]: "Checkbox",
};