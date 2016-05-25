package de.fzi.cep.sepa.streampipes.codegeneration.flink;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.squareup.javapoet.ClassName;

import de.fzi.cep.sepa.streampipes.codegeneration.utils.TV;
import de.fzi.cep.sepa.streampipes.codegeneration.utils.Utils;

public class InitGeneratorTest {

	@Test
	public void testGetEpaDeclarers() {
		List<ClassName> list = new ArrayList<ClassName>();
		list.add(ClassName.get(TV.PACKAGE_NAME, TV.NAME + "Controller"));

		String actual = new InitGenerator(null, TV.NAME, TV.PACKAGE_NAME, "8080").getEpaDeclarers(list).toString();
		String expected = "@java.lang.Override\n" + 
				"protected java.util.List<SemanticEventProcessingAgentDeclarer> epaDeclarers() {\n" +
				"  java.util.List<SemanticEventProcessingAgentDeclarer> result = new java.util.ArrayList<SemanticEventProcessingAgentDeclarer>();\n" +
				"  result.add(new de.fzi.cep.sepa.flink.test.project.TestProjectController());\n" + 
				"  return result;\n" + 
				"}\n";
		assertEquals(expected, actual);
	}

	@Test
	public void testGetSourceDeclarers() {
		String actual = new InitGenerator(null, TV.NAME, TV.PACKAGE_NAME, "8080").getSourceDeclarers(null).toString();
		String expected = "@java.lang.Override\n" + 
				"protected java.util.List<SemanticEventProducerDeclarer> sourceDeclarers() {\n" +
				"  java.util.List<SemanticEventProducerDeclarer> result = new java.util.ArrayList<SemanticEventProducerDeclarer>();\n" +
				"  return result;\n" + 
				"}\n";
		assertEquals(expected, actual);

	}

	@Test
	public void testGetConsumerEpaDeclarers() {
		String actual = new InitGenerator(null, TV.NAME, TV.PACKAGE_NAME, "8080").getConsumerEpaDeclarers(null).toString();
		String expected = "@java.lang.Override\n" + 
				"protected java.util.List<SemanticEventConsumerDeclarer> consumerDeclarers() {\n" +
				"  java.util.List<SemanticEventConsumerDeclarer> result = new java.util.ArrayList<SemanticEventConsumerDeclarer>();\n" +
				"  return result;\n" + 
				"}\n";
		assertEquals(expected, actual);
	}

	@Test
	public void testBuild() {
		String actual = new InitGenerator(null, TV.NAME, TV.PACKAGE_NAME, "8080").build().toString();
		String expected = Utils.readResourceFile("expected_Init_java");

		assertEquals(expected, actual);
	}

}
