export const mapApiDataToRows = (apiData) => {
    const rowsData = {}
    apiData.forEach((item) => {
        const row = {
            id: item._id, // generate unique id
            date: item.date, // already in YYYY-MM-DD format
            type: item.type, // 🔧 default since API doesn’t send it
            event: item.event,
            place: item.place,
            city: item.city || "", // optional, fallback empty string
            state: item.state || "",
            outcome: item.outcome,
            link: item.link,
        }

        // group by class
        if (!rowsData[item.class]) {
            rowsData[item.class] = []
        }
        rowsData[item.class].push(row)
    })
    return rowsData
}
