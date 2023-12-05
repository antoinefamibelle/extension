// Bitcoin test addresses
export const TEST_ACCOUNT_1_NATIVE_SEGWIT_ADDRESS = 'bc1q530dz4h80kwlzywlhx2qn0k6vdtftd93c499yq';
export const TEST_ACCOUNT_1_TAPROOT_ADDRESS =
  'bc1putuzj9lyfcm8fef9jpy85nmh33cxuq9u6wyuk536t9kemdk37yjqmkc0pg';
export const TEST_TESTNET_ACCOUNT_2_BTC_ADDRESS = 'tb1qr8me8t9gu9g6fu926ry5v44yp0wyljrespjtnz';

// Stacks test addresses
export const TEST_ACCOUNT_1_STX_ADDRESS = 'SPS8CKF63P16J28AYF7PXW9E5AACH0NZNTEFWSFE';
export const TEST_ACCOUNT_2_STX_ADDRESS = 'SPXH3HNBPM5YP15VH16ZXZ9AX6CK289K3MCXRKCB';
export const TEST_TESTNET_ACCOUNT_2_STX_ADDRESS = 'STXH3HNBPM5YP15VH16ZXZ9AX6CK289K3NVR9T1P';

// Account public keys
export const TEST_ACCOUNT_1_PUBKEY =
  '02b6b0afe5f620bc8e532b640b148dd9dea0ed19d11f8ab420fcce488fe3974893';
export const TEST_ACCOUNT_3_PUBKEY =
  '03c1e856462ca2844adb898aee90af5237e9d1be0fe51212635b2f7a643b0585e1';

// Bitcoin contracts
export const TEST_BITCOIN_CONTRACT_ATTESTOR_URLS =
  '["https://devnet.dlc.link/attestor-2","https://devnet.dlc.link/attestor-1","https://devnet.dlc.link/attestor-3"]';
export const TEST_BITCOIN_CONTRACT_OFFER =
  '{"protocolVersion":1,"contractFlags":0,"chainHash":"06226e46111a0b59caaf126043eb5bbf28c34f3a5e332a1fc7b2b73cf188910f","temporaryContractId":"7d23eb68507db7cdf1c503674ec9608544f0c2b441898a9fb3f833f81aab83c5","contractInfo":{"singleContractInfo":{"totalCollateral":10000,"contractInfo":{"contractDescriptor":{"numericOutcomeContractDescriptor":{"numDigits":14,"payoutFunction":{"payoutFunctionPieces":[{"endPoint":{"eventOutcome":0,"outcomePayout":0,"extraPrecision":0},"payoutCurvePiece":{"polynomialPayoutCurvePiece":{"payoutPoints":[]}}},{"endPoint":{"eventOutcome":100,"outcomePayout":10000,"extraPrecision":0},"payoutCurvePiece":{"polynomialPayoutCurvePiece":{"payoutPoints":[]}}}],"lastEndpoint":{"eventOutcome":16383,"outcomePayout":10000,"extraPrecision":0}},"roundingIntervals":{"intervals":[{"beginInterval":0,"roundingMod":1}]}}},"oracleInfo":{"multi":{"threshold":3,"oracleAnnouncements":[{"announcementSignature":"a52182d8142248567695a899d8584aaa8f56763bc3a9adcaf214c3d66b46436cfe09b71631fc66b9790365f25ec10104ef6369a9ea40e657cdb8523cc07d99fd","oraclePublicKey":"eaa01780f06a026622ece8b740cde318f814b2d314412e68c68dd4023c68052a","oracleEvent":{"oracleNonces":["4c26c2997dece716ee9538fb318461c9cc1b9f7c2bb6d15596c304899b6ba8cc","127d5d0466b2e73c6733555856cfd19536d49bad49ad7fad4daf20bacb8ae6e1","865be7f5ce2467df976449c2008325fd677d0b6ba889d27c595a4880fe1d1e3f","423e34b5d5820637461b23a5b5360bee70229dd5e49f8a8f7ab5440e00281db4","bcfcc20020fb2ef47baeaeb0ae9170e33faa40b590b7f61983df3cf12b0c5820","0e3d57bbc65ac1743230243c4ca8e2ead8c56c57744d560a34fba7a672b38b1c","4383810a0af8f907f95e90843b9a1057a158be4c20fb0252444728c8d9ae0717","b7681bc3135b12000f3abc184dcf9174d1835afbd68ed2774a5b4ee821141e13","f1e5365c160644004281de68fcd5f3ade50666016adb91cf620dcc960ed9f1b8","76485b44b2a82fb5fc97b665d7774026fc82dc06a20267df9e8b28cc1f5976c2","51bd2643b4ce77b23294d8a2fa62edf0f1d047ffc746d6357c8434fc18dbbd89","3919d344ef2e6448741b92e42e10ff13b43cce4537021fa85859dab6b785ef7f","05c68ea49ffa56b161e37fd7166f0de67ed3c62133ef61dbb4c1f82fb2e9e4e8","2e90ff8cd98effc308edf795a16360b523d45caa375b03b24f07e6a5b6350e33"],"eventMaturityEpoch":1705500842,"eventDescriptor":{"digitDecompositionEvent":{"base":2,"isSigned":false,"unit":"BTCUSD","precision":0,"nbDigits":14}},"eventId":"0x7212ba13ef9c5af579b6256e5ae0e6a053c67fb3df277d71d3e0677895f0629a"}},{"announcementSignature":"1b459c1267773970f80a30b81cd373f74564418d96fb71b5cb51b1ae8a7cf2cfd7fa74fdef4f1f0923028725563ccd062cc2fab277317e8210f975cf2490d001","oraclePublicKey":"eb7abed009f648192c363541263e7e8a8bdc1a56de39b33ff8fac8baab42275e","oracleEvent":{"oracleNonces":["ef17d7f0b047468241e01c58cbc44faccbbaadec44d113d37e98eb84e1eb5835","5eddd819f1eaaacb8a466fa52ae12f58effcba5e035959e70c559553f2392d17","3911c8c4ca6c42758c4b99922bf17a1bfd51f35b1a1f8b1c5b92d79b935a649e","89debc75335ca39d9b197ee77d74fc6498eca7fd8de29bc7e472ecfc1abb61c3","7a82ffe029e687d1f17bb2f1ff3e7498c3f3a49249309af3145756c3c6b52369","b5b8c1114297533ff92cdbb390b0ba6df5d6fe56da30b8677a3de1aebe1951cf","64726acc81b498f746f51a751177ee102138ab1264da7eace3fd774095e4b9a8","0ca0b6689b5798645bd309116500e2933e02110ab890d7c05fbc28aad0098e82","93d9ed9ba6e857dc821f897ec023a723690e98571dfcef962530717d0d984b92","f01ba826a84051ddcb456d44616c496123174efe95a9aade32b554300c19018e","b086fadb7ff7900123808a128afb8cd68eca3a2870ede9d48108af21f5333c2d","9a86c4209d574719f5450fedb205b27c2bcb2cd9f5981b756b33d53e6bd2a23f","ab79809d3d0325f220330de0cd0ea2dac62c55a3557bdf08abf442565c8d915a","3b90cc64a0f93317d659a68f8d144d757a779899df8dc211dd8d75fe6ab9c491"],"eventMaturityEpoch":1705500845,"eventDescriptor":{"digitDecompositionEvent":{"base":2,"isSigned":false,"unit":"BTCUSD","precision":0,"nbDigits":14}},"eventId":"0x7212ba13ef9c5af579b6256e5ae0e6a053c67fb3df277d71d3e0677895f0629a"}},{"announcementSignature":"35daa249c918e91a403ed373d4e786b021b328344ce1a99ca96f715ad565f31a83410585beaff7eb055bc99b3d24256a10ee7a0aa1edd719635043d25babd1ae","oraclePublicKey":"b7a66e9349350752703bbd779e1711beab6f67bf6f1a1c683e6621511b4aa7b7","oracleEvent":{"oracleNonces":["1e460e68ff0c296d12c12fba1172eb58680419b13a6ce939ad898004d40269c9","daf7f86bc906b39ef22aaaec8a6d40198b9d921882d731a67c55bad542c04fec","404dfee3cc69c9c800c2bd961207e09f2af70b38b82618393bce072677bf3841","9e57fc54b008297658f186148a8ff98f5f1faa2890cb68078a3d6fd7d4041c77","62aa2795bc81058d9de470167ce8d2425387f9d46a7efb0682502bbaec80dfc9","b2e8f595234cdcc45fb541c2a4e0c6e9ab21b49fcca91cd2624df31e4942b208","3aab86f7a26b71da2901d33095a68fa9f0e702e250a5915c34c2d0ae21232e7f","aeb01b2f537476454b80fa72781cbceb90710fd76d66d3e81270caa59c3670ae","87aa070a1e9dfa6a34476498acef34acf04b57de468400b4fd45b27721d48f86","5d4a961a38b9afe30bd1a25782bc3bbf4b072aa22d05272ebd0a94fc1a21cb09","4b7fbf2a0c85ccf8a806bb926c5b38aede95204cc9cf37a58a750a5a3779a5cf","da8305bfc28991a5c849c92fd9a086a90f143db9a6515f808e6022071f25a620","f385b0645223da47950e3501ae2bc7b63d96f1c926c55c9e8b4dce294679f2dc","8b744b07b5253ef4f06afa2c37d2c6cba382556122b6ed6dc6850c3a88bdad2e"],"eventMaturityEpoch":1705500844,"eventDescriptor":{"digitDecompositionEvent":{"base":2,"isSigned":false,"unit":"BTCUSD","precision":0,"nbDigits":14}},"eventId":"0x7212ba13ef9c5af579b6256e5ae0e6a053c67fb3df277d71d3e0677895f0629a"}}],"oracleParams":null}}}}},"fundingPubkey":"0244f854a8e35e6c15db085acca64d281a00449de20a391ffaa453653789ded41c","payoutSpk":"0014bc6eff91661193a5645006ec2f7172d224309825","payoutSerialId":7642446663264477000,"offerCollateral":0,"fundingInputs":[],"changeSpk":"0014bc6eff91661193a5645006ec2f7172d224309825","changeSerialId":3518700527019011000,"fundOutputSerialId":9975383107517720000,"feeRatePerVb":400,"cetLocktime":1697552870,"refundLocktime":1706105645}';
export const TEST_BITCOIN_CONTRACT_COUNTERPARTYWALLETDETAILS =
  '{"counterpartyWalletURL":"https://testnet.dlc.link/eth-wallet","counterpartyWalletName":"DLC.Link","counterpartyWalletIcon":"https://dlc-public-assets.s3.amazonaws.com/DLC.Link_logo_icon_color.svg"}';

export const TEST_BNS_NAME = 'test-hiro-wallet.btc';
export const TEST_BNS_RESOLVED_ADDRESS = 'SP12YQ0M2KFT7YMJKVGP71B874YF055F77PFPH9KM';
export const TEST_PASSWORD = 'my_s3cret_p@ssw0r4';
