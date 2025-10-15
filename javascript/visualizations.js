async function fetchData() {
    const data = await d3.csv("../dataset/videogames_wide.csv");
    return data;
}

fetchData().then(async (data) => {
    const vlSpec = vl
        .markBar()
        .data(data)
        .encode(
            vl.x().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),
            vl.y().fieldN("Platform").sort("-x"),
            vl.color().fieldN("Genre").title("Genre"),
            vl.tooltip([
                vl.fieldN("Genre"),
                vl.fieldN("Platform")
            ])
        )

        .width("container")
        .height(400)
        .toSpec();

    const vlSpec2 = vl
        .markCircle()
        .data(data)
        .encode(
            vl.x().fieldO("Year").title("Year"),
            vl.y().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),
            vl.color().fieldN("Platform").title("Platform"),
            vl.tooltip([
                vl.fieldO("Year"),
                vl.fieldN("Platform"),
                vl.fieldQ("Global_Sales")

            ])
        )
        .width("container")
        .height(400)
        .toSpec();

    const vlSpec3 = vl
        .markCircle()
        .data(data)
        .encode(
            vl.x().fieldO("Year").title("Year"),
            vl.y().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),
            vl.color().fieldN("Genre").title("Genre"),
            vl.tooltip([
                vl.fieldO("Year"),
                vl.fieldN("Genre"),
                vl.fieldQ("Global_Sales")

            ])
        )
        .width("container")
        .height(400)
        .toSpec();

    const vlSpec4 = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "An interactive scatterplot comparing regional sales of video games by platform",
        "data": { "url": "../dataset/videogames_wide.csv" },
        "mark": "point",
        "width": "container",
        "transform": [
            {
                "fold": ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"],
                "as": ["Region", "Sales"]
            }

        ],
        "encoding": {
            "x": {
                "field": "Global_Sales",
                "type": "quantitative",
                "aggregate": "sum",
                "title": "Total Global Sales (in millions)"
            },
            "y": {
                "field": "Platform",
                "type": "nominal"

            },

            "color": {
                "field": "Region",
                "type": "nominal",
                "title": "Region"

            },

            "tooltip": [
                { "field": "Region", "type": "nominal" },
                { "field": "Platform", "type": "nominal" },
                { "field": "Global_Sales", "type": "quantitative" }

            ]
        }



    };
    // .markBar()
    // .data(data)
    // .encode(
    //     vl.x().fieldO("Year").title("Year"),
    //     vl.y().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),
    //     vl.text().fieldN("Genre").title("Genre"),
    //     vl.color().fieldN("Platform").title("Platform"),
    //     vl.tooltip([
    //         vl.fieldO("Year"),
    //         vl.fieldN("Genre"),
    //         vl.fieldN("Platform"),
    //         vl.fieldQ("Global_Sales")

    //     ])
    // )
    // .width("container")
    // .height(400)
    // .toSpec();


    render("#view", vlSpec);
    render("#view2", vlSpec2);
    render("#view3", vlSpec3);
    render("#view4", vlSpec4);
});

async function render(viewID, spec) {
    const result = await vegaEmbed(viewID, spec);
    result.view.run();
}
