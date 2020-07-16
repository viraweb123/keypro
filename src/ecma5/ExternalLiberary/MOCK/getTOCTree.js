'use strict';

var getTOCTree = function getTOCTree(id) {
    return new Promise(function (resolve, reject) {
        try {

            resolve({
                data: {
                    TOC: [{
                        name: 'S1',
                        label: 'Introduction to Heat Transfer',
                        pages: 1,
                        start: 1,
                        childs: [{
                            name: 'S1-1',
                            label: 'about owner',
                            pages: 1,
                            start: 2
                        }, {
                            name: 'S1-2',
                            label: 'In Memory',
                            pages: 1,
                            start: 3
                        }, {
                            name: 'S1-3',
                            label: 'Forward To Preface',
                            pages: 1,
                            start: 4
                        }, {
                            name: 'S1-4',
                            label: 'Preface',
                            pages: 5,
                            start: 5
                        }]
                    }, {
                        name: 'S2',
                        label: 'Contents',
                        pages: 9,
                        start: 10
                    }, {
                        name: 'S3',
                        label: 'Symbols',
                        pages: 3,
                        start: 19
                    }, {
                        name: 'S4',
                        label: 'Chapter 1 Introduction',
                        pages: 1,
                        start: 22,
                        childs: [{
                            name: 'S4-1',
                            label: '1.1 What and How?',
                            pages: 1,
                            start: 23
                        }, {
                            name: 'S4-2',
                            label: '1.2 Physical Origins And Rate Equations',
                            pages: 0,
                            start: 24,
                            childs: [{
                                name: 'S4-2-1',
                                label: '1.2.1 Conduction',
                                pages: 3,
                                start: 24
                            }, {
                                name: 'S4-2-2',
                                label: '1.2.2 Convection',
                                pages: 3,
                                start: 27
                            }, {
                                name: 'S4-2-3',
                                label: '1.2.3 Radiation',
                                pages: 3,
                                start: 30
                            }, {
                                name: 'S4-2-4',
                                label: '1.2.4 Relationship to Thermodynamics',
                                pages: 1,
                                start: 33
                            }]
                        }, {
                            name: 'S4-3',
                            label: '1.3 The Conservation Of Energy Requirement?',
                            pages: 0,
                            start: 34,
                            childs: [{
                                name: 'S4-3-1',
                                label: '1.3.1 Conservation of Energy for a Control Volume',
                                pages: 12,
                                start: 34
                            }, {
                                name: 'S4-3-2',
                                label: '1.3.2 The Surface Energy Balance',
                                pages: 3,
                                start: 46
                            }, {
                                name: 'S4-3-3',
                                label: '1.3.3 Application of the Conservation Laws : Methodology',
                                pages: 1,
                                start: 49
                            }]
                        }, {
                            name: 'S4-4',
                            label: '1.4 Analysis of Heat Transfer Problems : Methodology',
                            pages: 3,
                            start: 50
                        }, {
                            name: 'S4-5',
                            label: '1.5 Relevance of Heat Transfer',
                            pages: 3,
                            start: 53
                        }, {
                            name: 'S4-6',
                            label: '1.6 Units and Dimensions',
                            pages: 3,
                            start: 56
                        }, {
                            name: 'S4-7',
                            label: '1.7 Summary',
                            pages: 18,
                            start: 59
                        }]
                    }, {
                        name: 'S5',
                        label: 'Chapter 2 Introduction To Conduction',
                        pages: 1,
                        start: 77,
                        childs: [{
                            name: 'S5-1',
                            label: '2.1 the conduction rate equation',
                            pages: 2,
                            start: 78
                        }]
                    }, {
                        name: 'S6',
                        label: 'appendix D the Convection transfer Equation',
                        pages: 4,
                        start: 78
                    }, {
                        name: 'S7',
                        label: 'appendix E Boundary Layer Equation for Turbulent Flow',
                        pages: 3,
                        start: 82
                    }, {
                        name: 'S8',
                        label: 'appendix F An Integral Laminar Boundary Layer Solution For Parralel Flow over a Flat Plate',
                        pages: 4,
                        start: 85
                    }, {
                        name: 'S9',
                        label: 'Index',
                        pages: 9,
                        start: 89
                    }],
                    INDEX: [{
                        index: 'advection',
                        pages: ['S4-2-2P1', //6
                        'S4-3-1P2' //14
                        ]
                    }, {
                        index: 'Bearer units',
                        pages: ['S4-6P1']
                    }, {
                        index: 'btu',
                        pages: ['S4-6P2']
                    }, {
                        index: 'bulk',
                        pages: ['S4-6P2']
                    }, {
                        index: 'chemical component of internal energy',
                        pages: ['S4-3-1P2']
                    }, {
                        index: 'closed system',
                        pages: ['S4-3-1P1']
                    }, {
                        index: 'conduction',
                        pages: ['S4-1P1', 'S4-2-1P1', 'S4-2-1P2', 'S4-2-1P3']
                    }, {
                        index: 'mechanisms of',
                        pages: ['S4-2-1P1', 'S4-2-1P3', 'S4-2-2P1', 'S4-2-3P1']
                    }, {
                        index: 'conservation of energy',
                        pages: ['S4-3-1P1', 'S4-4P1']
                    }, {
                        index: 'conservation laws',
                        pages: ['S4-4P1']
                    }, {
                        index: 'surface energy balance',
                        pages: ['S4-3-3P1', 'S4-3-2P1']
                    }, {
                        index: 'control surface',
                        pages: ['S4-3-1P2']
                    }, {
                        index: 'forced',
                        pages: ['S4-2-2P2', 'S4-2-2P3']
                    }, {
                        index: 'derived units',
                        pages: ['S4-6P3', 'S4-7P1']
                    }, {
                        index: 'diffusion of energy',
                        pages: ['S4-2-1P1', 'S4-2-1P2']
                    }, {
                        index: 'Energy',
                        pages: ['S4-2-1P1', 'S4-2-1P2']
                    }, {
                        index: 'English system of units',
                        pages: ['S4-6P1', 'S4-6P3']
                    }, {
                        index: 'equilibrium states',
                        pages: ['S4-2-4P1', 'S4-3-1P1']
                    }, {
                        index: 'Evaporation',
                        pages: ['S4-3-1P4']
                    }, {
                        index: 'Freezing',
                        pages: ['S4-3-1P4']
                    }, {
                        index: 'finite control volumes',
                        pages: ['S4-4P1']
                    }, {
                        index: 'first law of thermodynamics',
                        pages: ['S4-3-1P1']
                    }, {
                        index: 'flow work',
                        pages: ['S4-3-1P4']
                    }, {
                        index: 'forced convection',
                        pages: ['S4-2-2P2', 'S4-2-2P3']
                    }, {
                        index: 'free convection',
                        pages: ['S4-2-2P2', 'S4-2-2P3']
                    }, {
                        index: 'gray surface',
                        pages: ['S4-2-3P2']
                    }, {
                        index: 'heat sinks',
                        pages: ['S4-5P2']
                    }, {
                        index: 'problems , methodology for analysis',
                        pages: ['S4-4P1', 'S4-4P2']
                    }, {
                        index: 'thermodynamics vs',
                        pages: ['S4-2-4P1', 'S4-3-1P1']
                    }, {
                        index: 'incompressible liquids',
                        pages: ['S4-3-1P6']
                    }, {
                        index: 'internal energy',
                        pages: ['S4-3-1P2']
                    }, {
                        index: 'kilogram-mol',
                        pages: ['S4-6P3']
                    }, {
                        index: 'latent component of internal energy',
                        pages: ['S4-3-1P3']
                    }, {
                        index: 'latent heat exchange',
                        pages: ['S4-2-2P3']
                    }, {
                        index: 'latent waves',
                        pages: ['S4-2-1P2']
                    }, {
                        index: 'length',
                        pages: ['S4-6P1']
                    }, {
                        index: 'macroscopic (bulk) motion',
                        pages: ['S4-2-2P1', 'S4-2-2P3']
                    }, {
                        index: 'mass',
                        pages: ['S4-6P1']
                    }, {
                        index: 'mole',
                        pages: ['S4-6P3']
                    }, {
                        index: 'melting',
                        pages: ['S4-3-1P4']
                    }, {
                        index: 'nuclear',
                        pages: ['S4-3-1P3']
                    }, {
                        index: 'nuclear component of internal energy',
                        pages: ['S4-3-1P3']
                    }, {
                        index: 'opaque surface',
                        pages: ['S4-2-3P2']
                    }, {
                        index: 'open system',
                        pages: ['S4-3-12', 'S4-3-1P6']
                    }, {
                        index: 'phase',
                        pages: ['S4-3-1P3', 'S4-3-1P4']
                    }, {
                        index: 'physical mechanisms',
                        pages: ['S4-2-1P1', 'S4-2-4P1']
                    }, {
                        index: 'incident',
                        pages: ['S4-2-3P2']
                    }, {
                        index: 'radiation heat',
                        pages: ['S4-2-3P2']
                    }, {
                        index: 'rate basis',
                        pages: ['S4-3-1P1']
                    }, {
                        index: 'rate',
                        pages: ['S4-3-1P1', 'S4-2-1P2']
                    }, {
                        index: 'semitransparent',
                        pages: ['S4-2-3P2']
                    }, {
                        index: 'sensible energy',
                        pages: ['S4-2-2P3']
                    }, {
                        index: 'sensitivity study',
                        pages: ['S4-3-3P1']
                    }, {
                        index: 'opaque',
                        pages: ['S4-2-2P3']
                    }, {
                        index: 'temperature',
                        pages: ['S4-2-1P1', 'S4-2-1P2', 'S4-6P1', 'S4-6P3']
                    }]
                }

            });
        } catch (e) {
            reject('عدم دریافت اطلاعات');
        }
    });
};