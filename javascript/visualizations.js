async function fetchData() {
    const data = await d3.csv("../dataset/videogames_wide.csv");
    return data;
}

fetchData().then(async (data) => {
    const vlSpec = vl
        .markBar()
        .data(data)
        .encode(
            vl.y().fieldN("Platform").sort("-x"),
            vl.x().fieldQ("Global_Sales").aggregate("sum")
        )
        .width("container")
        .height(400)
        .toSpec();

    const vlSpec2 = vl
        .markBar()
        .data(data)
        .encode(
            vl.y().fieldN("Genre").sort("-x"),
            vl.x().fieldQ("Global_Sales").aggregate("sum"),
            vl.color().value("teal")
        )
        .width("container")
        .height(400)
        .toSpec();

    render("#view", vlSpec);
    render("#view2", vlSpec2);
});

async function render(viewID, spec) {
    const result = await vegaEmbed(viewID, spec);
    result.view.run();
}
