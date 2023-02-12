const { PostgresSQL, 
    PostgreSQLParserVisitor, 
    PostgreSQLParserListener } = require ('dt-sql-parser')
  
  const { PgLiteVisitor,
    SqlLineageGenerator } = require ('../../src/libs/lineage/SqlLineageGenerator')
  
  
  const parser = new PostgresSQL()
  
  describe('测试SQL解析', () => { 
  
    test('should first', () => { 
      const correctSql = 'select id,name from user1;';
      const errors = parser.validate(correctSql);
      expect(errors.length).toBe(0);      
     })
  
     
     test('should be output users', () => { 
      const input = 'select id,name from users;';
      const tree = parser.parse(input);
      const visitor = new PgLiteVisitor()
      visitor.visitStmt(tree)
      let tableLineage = visitor.getTableLineage()
      let table = tableLineage
      console.log(table)
  
    })
  
    
    test('should be output users', () => { 
      const input = 'select id,name from users;';
      const generator = new SqlLineageGenerator()
      let res  = generator.getLineageDeps(input)
      console.log(res)
  
    })
  
  })