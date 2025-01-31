/**
 * testing file for the snapgene parser, which should be able to handle multiple sequences in the same file, comments, and any other sort of vaild snapgene format
 */
import snapgeneToJson from "../parsers/snapgeneToJson";

import path from "path";
import fs from "fs";
import chai from "chai";
import chaiSubset from "chai-subset";
chai.use(require("chai-things"));
chai.use(chaiSubset);
chai.should();

describe("snapgene file parser", function() {
  it(`the description should not include <html><body> text (we should remove it if we see it)`, async () => {
    const fileObj = fs.readFileSync(
      path.join(__dirname, "./testData/dna/T7 promoter.dna")
    );

    const result = await snapgeneToJson(fileObj, {
      fileName: "T7 promoter.dna",
    });

    result[0].parsedSequence.description.should.equal(
      "Promoter for bacteriophage T7 RNA polymerase."
    );
  });
  it(`an invalid file should return an unsuccessful response`, async () => {
    const results = await snapgeneToJson(
      { zoink: "berg" },
      {
        fileName: "GFPuv_025_fwdfeature_linear.dna",
      }
    );
    results[0].success.should.equal(false);
  });
  it("linear dna w/feature on forward strand", async function() {
    const fileObj = fs.readFileSync(
      path.join(__dirname, "./testData/dna/GFPuv_025_fwdfeature_linear.dna")
      // path.join(__dirname, "./testData/dna/GFPuv_025_fwdfeature_linear.dna"),
    );
    const result = await snapgeneToJson(fileObj, {
      fileName: "GFPuv_025_fwdfeature_linear.dna",
    });

    result[0].parsedSequence.name.should.equal("GFPuv_025_fwdfeature_linear");
    result[0].parsedSequence.circular.should.equal(false);
    result[0].parsedSequence.sequence
      .toLowerCase()
      .should.equal(
        "cagaaagcgtcacaaaagatggaatcaaagctaacttcaaaattcgccacaacattgaagatggatctgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtcgacacaatctgccctttcgaaagatcccaacgaaaagcgtgaccacatggtccttcttgagtttgtaactgctgctgggattacacatggcatggatgagctcggcggcggcggcagcaaggtctacggcaaggaacagtttttgcggatgcgccagagcatgttccccgatcgctaaatcgagtaaggatctccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctctactagagtcacactggctcaccttcgggtgggcctttctgcgtttatacctagggtacgggttttgctgcccgcaaacgggctgttctggtgttgctagtttgttatcagaatcgcagatccggcttcagccggtttgccggctgaaagcgctatttcttccagaattgccatgattttttccccacgggaggcgtcactggctcccgtgttgtcggcagctttgattcgataagcagcatcgcctgtttcaggctgtctatgtgtgactgttgagctgtaacaagttgtctcaggtgttcaatttcatgttctagttgctttgttttactggtttcacctgttctattaggtgttacatgctgttcatctgttacattgtcgatctgttcatggtgaacagctttgaatgcaccaaaaactcgtaaaagctctgatgtatctatcttttttacaccgttttcatctgtgcatatggacagttttccctttgatatgtaacggtgaacagttgttctacttttgtttgttagtcttgatgcttcactgatagatacaagagccataagaacctcagatccttccgtatttagccagtatgttctctagtgtggttcgttgttttgccgtggagcaatgagaacgagccattgagatcatacttacctttgcatgtcactcaaaattttgcctcaaaactgggtgagctgaatttttgcagtaggcatcgtgtaagtttttctagtcggaatgatgatagatcgtaagttatggatggttggcatttgtccagttcatgttatctggggtgttcgtcagtcggtcagcagatccacatagtggttcatctagatcacac"
      );
    result[0].parsedSequence.features.should.containSubset([
      {
        // we're returning 0-based
        start: 399,
        end: 499,
        name: "fwdFeature",
      },
    ]);
  });
  it("circular dna w/feature on forward strand", async function() {
    const fileObj = fs.readFileSync(
      path.join(__dirname, "./testData/dna/GFPuv_025_fwdfeature_circular.dna")
    );
    const result = await snapgeneToJson(fileObj, {
      fileName: "GFPuv_025_fwdfeature_circular.dna",
    });

    result[0].parsedSequence.name.should.equal("GFPuv_025_fwdfeature_circular");
    result[0].parsedSequence.circular.should.equal(true);
    result[0].parsedSequence.sequence
      .toLowerCase()
      .should.equal(
        "cagaaagcgtcacaaaagatggaatcaaagctaacttcaaaattcgccacaacattgaagatggatctgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtcgacacaatctgccctttcgaaagatcccaacgaaaagcgtgaccacatggtccttcttgagtttgtaactgctgctgggattacacatggcatggatgagctcggcggcggcggcagcaaggtctacggcaaggaacagtttttgcggatgcgccagagcatgttccccgatcgctaaatcgagtaaggatctccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctctactagagtcacactggctcaccttcgggtgggcctttctgcgtttatacctagggtacgggttttgctgcccgcaaacgggctgttctggtgttgctagtttgttatcagaatcgcagatccggcttcagccggtttgccggctgaaagcgctatttcttccagaattgccatgattttttccccacgggaggcgtcactggctcccgtgttgtcggcagctttgattcgataagcagcatcgcctgtttcaggctgtctatgtgtgactgttgagctgtaacaagttgtctcaggtgttcaatttcatgttctagttgctttgttttactggtttcacctgttctattaggtgttacatgctgttcatctgttacattgtcgatctgttcatggtgaacagctttgaatgcaccaaaaactcgtaaaagctctgatgtatctatcttttttacaccgttttcatctgtgcatatggacagttttccctttgatatgtaacggtgaacagttgttctacttttgtttgttagtcttgatgcttcactgatagatacaagagccataagaacctcagatccttccgtatttagccagtatgttctctagtgtggttcgttgttttgccgtggagcaatgagaacgagccattgagatcatacttacctttgcatgtcactcaaaattttgcctcaaaactgggtgagctgaatttttgcagtaggcatcgtgtaagtttttctagtcggaatgatgatagatcgtaagttatggatggttggcatttgtccagttcatgttatctggggtgttcgtcagtcggtcagcagatccacatagtggttcatctagatcacac"
      );
    result[0].parsedSequence.features.should.containSubset([
      {
        start: 299,
        end: 399,
        name: "fwdFeature",
      },
    ]);
  });
  it("linear dna w/feature on reverse strand", async function() {
    const fileObj = fs.readFileSync(
      path.join(__dirname, "./testData/dna/GFPuv_025_revfeature_linear.dna")
    );
    const result = await snapgeneToJson(fileObj, {
      fileName: "GFPuv_025_revfeature_linear.dna",
    });

    result[0].parsedSequence.name.should.equal("GFPuv_025_revfeature_linear");
    result[0].parsedSequence.circular.should.equal(false);
    result[0].parsedSequence.sequence
      .toLowerCase()
      .should.equal(
        "cagaaagcgtcacaaaagatggaatcaaagctaacttcaaaattcgccacaacattgaagatggatctgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtcgacacaatctgccctttcgaaagatcccaacgaaaagcgtgaccacatggtccttcttgagtttgtaactgctgctgggattacacatggcatggatgagctcggcggcggcggcagcaaggtctacggcaaggaacagtttttgcggatgcgccagagcatgttccccgatcgctaaatcgagtaaggatctccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctctactagagtcacactggctcaccttcgggtgggcctttctgcgtttatacctagggtacgggttttgctgcccgcaaacgggctgttctggtgttgctagtttgttatcagaatcgcagatccggcttcagccggtttgccggctgaaagcgctatttcttccagaattgccatgattttttccccacgggaggcgtcactggctcccgtgttgtcggcagctttgattcgataagcagcatcgcctgtttcaggctgtctatgtgtgactgttgagctgtaacaagttgtctcaggtgttcaatttcatgttctagttgctttgttttactggtttcacctgttctattaggtgttacatgctgttcatctgttacattgtcgatctgttcatggtgaacagctttgaatgcaccaaaaactcgtaaaagctctgatgtatctatcttttttacaccgttttcatctgtgcatatggacagttttccctttgatatgtaacggtgaacagttgttctacttttgtttgttagtcttgatgcttcactgatagatacaagagccataagaacctcagatccttccgtatttagccagtatgttctctagtgtggttcgttgttttgccgtggagcaatgagaacgagccattgagatcatacttacctttgcatgtcactcaaaattttgcctcaaaactgggtgagctgaatttttgcagtaggcatcgtgtaagtttttctagtcggaatgatgatagatcgtaagttatggatggttggcatttgtccagttcatgttatctggggtgttcgtcagtcggtcagcagatccacatagtggttcatctagatcacac"
      );
    result[0].parsedSequence.features.should.containSubset([
      {
        // complement(600..700)
        start: 599,
        end: 699,
        name: "revFeature",
      },
    ]);
  });
  it("circular dna w/feature on reverse strand", async function() {
    const fileObj = fs.readFileSync(
      path.join(__dirname, "./testData/dna/GFPuv_025_revfeature_circular.dna")
    );
    const result = await snapgeneToJson(fileObj, {
      fileName: "GFPuv_025_revfeature_circular.dna",
    });

    result[0].parsedSequence.name.should.equal("GFPuv_025_revfeature_circular");
    result[0].parsedSequence.circular.should.equal(true);
    result[0].parsedSequence.sequence
      .toLowerCase()
      .should.equal(
        "cagaaagcgtcacaaaagatggaatcaaagctaacttcaaaattcgccacaacattgaagatggatctgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtcgacacaatctgccctttcgaaagatcccaacgaaaagcgtgaccacatggtccttcttgagtttgtaactgctgctgggattacacatggcatggatgagctcggcggcggcggcagcaaggtctacggcaaggaacagtttttgcggatgcgccagagcatgttccccgatcgctaaatcgagtaaggatctccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctctactagagtcacactggctcaccttcgggtgggcctttctgcgtttatacctagggtacgggttttgctgcccgcaaacgggctgttctggtgttgctagtttgttatcagaatcgcagatccggcttcagccggtttgccggctgaaagcgctatttcttccagaattgccatgattttttccccacgggaggcgtcactggctcccgtgttgtcggcagctttgattcgataagcagcatcgcctgtttcaggctgtctatgtgtgactgttgagctgtaacaagttgtctcaggtgttcaatttcatgttctagttgctttgttttactggtttcacctgttctattaggtgttacatgctgttcatctgttacattgtcgatctgttcatggtgaacagctttgaatgcaccaaaaactcgtaaaagctctgatgtatctatcttttttacaccgttttcatctgtgcatatggacagttttccctttgatatgtaacggtgaacagttgttctacttttgtttgttagtcttgatgcttcactgatagatacaagagccataagaacctcagatccttccgtatttagccagtatgttctctagtgtggttcgttgttttgccgtggagcaatgagaacgagccattgagatcatacttacctttgcatgtcactcaaaattttgcctcaaaactgggtgagctgaatttttgcagtaggcatcgtgtaagtttttctagtcggaatgatgatagatcgtaagttatggatggttggcatttgtccagttcatgttatctggggtgttcgtcagtcggtcagcagatccacatagtggttcatctagatcacac"
      );
    result[0].parsedSequence.features.should.containSubset([
      {
        // complement(500..600)
        start: 499,
        end: 599,
        name: "revFeature",
      },
    ]);
  });
});
