const { PostgresSQL, 
    PostgreSQLParserVisitor, 
    PostgreSQLParserListener } = require ('dt-sql-parser')
  
  
  class PgLiteVisitor extends PostgreSQLParserVisitor{  
    
    tableLineage;
    qualifiedName;
    
    constructor(){
      super()
      this.tableLineage = {
        inputTable:[],
        outputTable:[]
      }
  
      this.qualifiedName = ''
    }
  
    visitQualified_name(ctx) {
      this.qualifiedName = ctx.getText().toLowerCase();
  
      this.tableLineage.inputTable.push(this.qualifiedName)
    }
  
    getTableLineage(){
      return this.tableLineage
    }
  
  }
  
class SqlLineageGenerator{
    constructor(){
    }
  
    getLineageDeps(code){
      const parser = new PostgresSQL()
      const visitor =  new PgLiteVisitor()
      const tree = parser.parse(code)
      visitor.visitStmt(tree)
      const res = visitor.getTableLineage()
      return res
    }
  
}
  
module.exports = {
    PgLiteVisitor,
    SqlLineageGenerator
};