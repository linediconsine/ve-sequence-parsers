import jsonToFasta from "../parsers/jsonToFasta";
import chai from "chai";

chai.should();
describe("fasta exporter/parser conversion", function() {
  it(`should export a protein sequence by default if the sequence isProtein`, () => {
    const string = jsonToFasta({
      sequence: "augaugcayyunmngyunuuy",
      proteinSequence: "MMHLRLF",
      isProtein: true,
    });
    string.should.equal(`>Untitled Sequence||7|linear
MMHLRLF`);
  });
  it("should correctly make a fasta file", function() {
    // const breakingJSON = require('./testData/json/breakingJSON_stringified')
    const breakingJSON = require("./testData/json/1.json");
    const string = jsonToFasta(breakingJSON);
    string.should.equal(
      `>pRS414__modified||5901|circular
gacgaaagggcctcgtgatacgcctatttttataggttaatgtcatgataataatggtttcttaggacggatcgcttgcc
tgtaacttacacgcgcctcgtatcttttaatgatggaataatttgggaatttactctgtgtttatttatttttatgtttt
gtatttggattttagaaagtaaataaagaaggtagaagagttacggaatgaagaaaaaaaaataaacaaaggtttaaaaa
atttcaacaaaaagcgtactttacatatatatttattagacaagaaaagcagattaaatagatatacattcgattaacga
taagtaaaatgtaaaatcacaggattttcgtgtgtggtcttctacacagacaagatgaaacaattcggcattaatacctg
agagcaggaagagcaagataaaaggtagtatttgttggcgatccccctagagtcttttacatcttcggaaaacaaaaact
attttttctttaatttctttttttactttctatttttaatttatatatttatattaaaaaatttaaattataattatttt
tatagcacgtgatgaaaaggacccaggtggcacttttcggggaaatgtgcgcggaacccctatttgtttatttttctaaa
tacattcaaatatgtatccgctcatgagacaataaccctgataaatgcttcaataatattgaaaaaggaagagtatgagt
attcaacatttccgtgtcgcccttattcccttttttgcggcattttgccttcctgtttttgctcacccagaaacgctggt
gaaagtaaaagatgctgaagatcagttgggtgcacgagtgggttacatcgaactggatctcaacagcggtaagatccttg
agagttttcgccccgaagaacgttttccaatgatgagcacttttaaagttctgctatgtggcgcggtattatcccgtatt
gacgccgggcaagagcaactcggtcgccgcatacactattctcagaatgacttggttgagtactcaccagtcacagaaaa
gcatcttacggatggcatgacagtaagagaattatgcagtgctgccataaccatgagtgataacactgcggccaacttac
ttctgacaacgatcggaggaccgaaggagctaaccgcttttttgcacaacatgggggatcatgtaactcgccttgatcgt
tgggaaccggagctgaatgaagccataccaaacgacgagcgtgacaccacgatgcctgtagcaatggcaacaacgttgcg
caaactattaactggcgaactacttactctagcttcccggcaacaattaatagactggatggaggcggataaagttgcag
gaccacttctgcgctcggcccttccggctggctggtttattgctgataaatctggagccggtgagcgtgggtctcgcggt
atcattgcagcactggggccagatggtaagccctcccgtatcgtagttatctacacgacggggagtcaggcaactatgga
tgaacgaaatagacagatcgctgagataggtgcctcactgattaagcattggtaactgtcagaccaagtttactcatata
tactttagattgatttaaaacttcatttttaatttaaaaggatctaggtgaagatcctttttgataatctcatgaccaaa
atcccttaacgtgagttttcgttccactgagcgtcagaccccgtagaaaagatcaaaggatcttcttgagatcctttttt
tctgcgcgtaatctgctgcttgcaaacaaaaaaaccaccgctaccagcggtggtttgtttgccggatcaagagctaccaa
ctctttttccgaaggtaactggcttcagcagagcgcagataccaaatactgtccttctagtgtagccgtagttaggccac
cacttcaagaactctgtagcaccgcctacatacctcgctctgctaatcctgttaccagtggctgctgccagtggcgataa
gtcgtgtcttaccgggttggactcaagacgatagttaccggataaggcgcagcggtcgggctgaacggggggttcgtgca
cacagcccagcttggagcgaacgacctacaccgaactgagatacctacagcgtgagctatgagaaagcgccacgcttccc
gaagggagaaaggcggacaggtatccggtaagcggcagggtcggaacaggagagcgcacgagggagcttccagggggaaa
cgcctggtatctttatagtcctgtcgggtttcgccacctctgacttgagcgtcgatttttgtgatgctcgtcaggggggc
ggagcctatggaaaaacgccagcaacgcggcctttttacggttcctggccttttgctggccttttgctcacatgttcttt
cctgcgttatcccctgattctgtggataaccgtattaccgcctttgagtgagctgataccgctcgccgcagccgaacgac
cgagcgcagcgagtcagtgagcgaggaagcggaagagcgcccaatacgcaaaccgcctctccccgcgcgttggccgattc
attaatgcagctggcacgacaggtttcccgactggaaagcgggcagtgagcgcaacgcaattaatgtgagttacctcact
cattaggcaccccaggctttacactttatgcttccggctcctatgttgtgtggaattgtgagcggataacaatttcacac
aggaaacagctatgaccatgattacgccaagcgcgcaattaaccctcactaaagggaacaaaagctggagctcactagtg
tttaaacctgagagtgcaccataccacagcttttcaattcaattcatcattttttttttattcttttttttgatttcggt
ttctttgaaatttttttgattcggtaatctccgaacagaaggaagaacgaaggaaggagcacagacttagattggtatat
atacgcatatgtagtgttgaagaaacatgaaattgcccagtattcttaacccaactgcacagaacaaaaacctgcaggaa
acgaagataaatcatgtcgaaagctacatataaggaacgtgctgctactcatcctagtcctgttgctgccaagctattta
atatcatgcacgaaaagcaaacaaacttgtgtgcttcattggatgttcgtaccaccaaggaattactggagttagttgaa
gcattaggtcccaaaatttgtttactaaaaacacatgtggatatcttgactgatttttccatggagggcacagttaagcc
gctaaaggcattatccgccaagtacaattttttactcttcgaagacagaaaatttgctgacattggtaatacagtcaaat
tgcagtactctgcgggtgtatacagaatagcagaatgggcagacattacgaatgcacacggtgtggtgggcccaggtatt
gttagcggtttgaagcaggcggcagaagaagtaacaaaggaacctagaggccttttgatgttagcagaattgtcatgcaa
gggctccctatctactggagaatatactaagggtactgttgacattgcgaagagcgacaaagattttgttatcggcttta
ttgctcaaagagacatgggtggaagagatgaaggttacgattggttgattatgacacccggtgtgggtttagatgacaag
ggagacgcattgggtcaacagtatagaaccgtggatgatgtggtctctacaggatctgacattattattgttggaagagg
actatttgcaaagggaagggatgctaaggtagagggtgaacgttacagaaaagcaggctgggaagcatatttgagaagat
gcggccagcaaaactaaaaaactgtattataagtaaatgcatgtatactaaactcacaaattagagcttcaatttaatta
tatcagttattacgtttaaacttaataactgcaggaattcgatatcaagcttatcgataccgtcgacctcgagggggggc
ccggtacccaattcgccctatagtgagtcgtattacgcgcgctcactggccgtcgttttacaacgtcgtgactgggaaaa
ccctggcgttacccaacttaatcgccttgcagcacatccccctttcgccagctggcgtaatagcgaagaggcccgcaccg
atcgcccttcccaacagttgcgcagcctgaatggcgaatggcgcgacgcgccctgtagcggcgcattaagcgcggcgggt
gtggtggttacgcgcagcgtgaccgctacacttgccagcgccctagcgcccgctcctttcgctttcttcccttcctttct
cgccacgttcgccggctttccccgtcaagctctaaatcgggggctccctttagggttccgatttagtgctttacggcacc
tcgaccccaaaaaacttgattagggtgatggttcacgtagtgggccatcgccctgatagacggtttttcgccctttgacg
ttggagtccacgttctttaatagtggactcttgttccaaactggaacaacactcaaccctatctcggtctattcttttga
tttataagggattttgccgatttcggcctattggttaaaaaatgagctgatttaacaaaaatttaacgcgaattttaaca
aaatattaacgtttacaatttcctgatgcggtattttctccttacgcatctgtgcggtatttcacaccgcataggcaagt
gcacaaacaatacttaaataaatactactcagtaataacctatttcttagcatttttgacgaaatttgctattttgttag
agtcttttacaccatttgtctccacacctccgcttacatcaacaccaataacgccatttaatctaagcgcatcaccaaca
ttttctggcgtcagtccaccagctaacataaaatgtaagctttcggggctctcttgccttccaacccagtcagaaatcga
gttccaatccaaaagttcacctgtcccacctgcttctgaatcaaacaagggaataaacgaatgaggtttctgtgaagctg
cactgagtagtatgttgcagtcttttggaaatacgagtcttttaataactggcaaaccgaggaactcttggtattcttgc
cacgactcatctccatgcagttggacgatatcaatgccgtaatcattgaccagagccaaaacatcctccttaggttgatt
acgaaacacgccaaccaagtatttcggagtgcctgaactatttttatatgcttttacaagacttgaaattttccttgcaa
taaccgggtcaattgttctctttctattgggcacacatataatacccagcaagtcagcatcggaatctagagcacattct
gcggcctctgtgctctgcaagccgcaaactttcaccaatggaccagaactacctgtgaaattaataacagacatactcca
agctgcctttgtgtgcttaatcacgtatactcacgtgctcaatagtcaccaatgccctccctcttggccctctccttttc
ttttttcgaccgaattaattcttaatcggcaaaaaaagaaaagctccggatcaagattgtacgtaaggtgacaagctatt
tttcaataaagaatatcttccactactgccatctggcgtcataactgcaaagtacacatatattacgatgctgtctatta
aatgcttcctatattatatatatagtaatgtcgtttatggtgcactctcagtacaatctgctctgatgccgcatagttaa
gccagccccgacacccgccaacacccgctgacgcgccctgacgggcttgtctgctcccggcatccgcttacagacaagct
gtgaccgtctccgggagctgcatgtgtcagaggttttcaccgtcatcaccgaaacgcgcga`
    );
  });
});
