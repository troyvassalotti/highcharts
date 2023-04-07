(async () => {

    const topology = await fetch(
        'https://code.highcharts.com/mapdata/custom/europe.topo.json'
    ).then(response => response.json());

    const { colors } = Highcharts.getOptions();

    // Instantiate the map
    Highcharts.mapChart('container', {
        chart: {
            map: topology,
            margin: 0,
            marginBottom: 45,
            borderColor: '#ccc',
            borderWidth: 2
        },

        title: {
            text: ''
        },

        accessibility: {
            series: {
                descriptionFormat: 'Timezone {series.name} with {series.points.length} countries.'
            },
            point: {
                valueDescriptionFormat: '{point.name}.'
            }
        },

        legend: {
            enabled: true,
            symbolHeight: 0.001,
            itemDistance: 0,
            labelFormatter() {
                const name = this.name,
                    borderColor = this.userOptions.borderColor;

                return `<span style='color: ${borderColor}'>⬤</span> ${name}`;
            }
        },

        navigation: {
            buttonOptions: {
                align: 'left',
                x: -1,
                height: 28,
                width: 28,
                symbolSize: 14,
                symbolX: 14.5,
                symbolY: 13.5,
                theme: {
                    'stroke-width': 1,
                    stroke: 'silver',
                    r: 8,
                    padding: 10
                }
            }
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                x: 10,
                theme: {
                    r: 8
                }
            },
            buttons: {
                zoomIn: {
                    y: 10
                },
                zoomOut: {
                    y: 38
                }
            }
        },

        plotOptions: {
            map: {
                allAreas: false,
                joinBy: ['iso-a2', 'code'],
                color: 'transparent',
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    style: {
                        fontWeight: 'bold'
                    },
                    // Only show dataLabels for areas with high label rank
                    format: null,
                    formatter: function () {
                        if (
                            this.point.properties &&
                            this.point.properties.labelrank < 5
                        ) {
                            return this.point.properties['iso-a2'];
                        }
                    }
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '{point.name}: <b>{series.name}</b>'
                },
                states: {
                    hover: {
                        borderWidth: 5,
                        linecap: 'round'
                    }
                }
            }
        },

        series: [{
            type: 'tiledwebmap',
            showInLegend: false,
            provider: {
                type: 'USGS',
                theme: 'USImagery'
            }
        }, {
            borderColor: colors[0],
            name: 'UTC',
            data: ['IE', 'IS', 'GB', 'PT'].map(code => ({
                code
            }))
        }, {
            name: 'UTC + 1',
            borderColor: colors[2],
            data: [
                'NO', 'SE', 'DK', 'DE', 'NL', 'BE', 'LU', 'ES', 'FR', 'PL',
                'CZ', 'AT', 'CH', 'LI', 'SK', 'HU', 'SI', 'IT', 'SM', 'HR',
                'BA', 'YF', 'ME', 'AL', 'MK'
            ].map(code => ({
                code
            }))
        }, {
            name: 'UTC + 2',
            borderColor: colors[3],
            data: [
                'FI', 'EE', 'LV', 'LT', 'BY', 'UA', 'MD', 'RO', 'BG', 'GR',
                'TR', 'CY'
            ].map(code => ({
                code
            }))
        }]
    });

})();
