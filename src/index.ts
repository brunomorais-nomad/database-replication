import { AppDataSource } from "./data-source";
import { TestData } from "./entity/testData";
import { InsertResult } from "typeorm"; 

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("📦 Conectado ao banco de dados!");

        const repo = AppDataSource.getRepository(TestData);

        // --- 🚀 Inserção com QueryBuilder e .returning() ---
        const novaMensagem = "Dados inseridos com RETURNING";
        console.log(`\n⏳ Tentando inserir a mensagem: "${novaMensagem}"`);

        const insertResult: InsertResult = await AppDataSource.createQueryBuilder()
            .insert()
            .into(TestData)
            .values({ message: novaMensagem }) // Os dados a serem inseridos
            .returning('*') // Colunas que queremos de volta
            .execute();

        console.log("✅ Inserção concluída!");
        
        // Exibindo o resultado do .returning()
        console.log("📝 Resultado do .returning() (em insertResult.raw):");
        
        // Acessa o array de resultados (o conteúdo do RETURNING)
        const insertedRow = insertResult.raw[0]; 

        if (insertedRow) {
            console.log(`   ID Retornado: ${insertedRow.id}`);
            console.log(`   Mensagem Retornada: ${insertedRow.message}`);
            console.log(`   Criado em Retornado: ${insertedRow.created_at}`); 
            const allData = await repo.find({
            where: { id: insertedRow.id },
        });

        console.log("\n🧾 Dados novo encontrados:");
        console.log(allData[0])
        } else {
            console.log("   Nenhum dado retornado em .raw.");
        }
        // ----------------------------------------------------------------

        const allData = await repo.find({
            order: { id: "ASC" },
        });

        console.log("\n🧾 Dados encontrados (incluindo o novo):");
        allData.forEach((row) => {
            // Você pode querer formatar a data aqui
            console.log(`ID: ${row.id} | Mensagem: ${row.message} | Criado em: ${row.created_at}`);
        });

        await AppDataSource.destroy();
    } catch (err) {
        console.error("\n❌ Erro ao conectar, ler ou inserir dados:", err);
    }
}

main();
