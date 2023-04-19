const Batch1 = [
    {
        label: "BatchName",
        name: "BatchName",
        error: "BatchName",
        helper: "BatchName",
        required: "Enter the BatchName",
        placeholder: "BatchName"
    },
    {
        label: "Session",
        name: "Session",
        error: "Session",
        helper: "Session",
        pattern: "/^[A-Z]{1}[0-9]{3}/",
        required: "Enter the Session",
        message: "",
        placeholder: "Session",
        select: "select",
        options: ["FullDay", "Morning", "AfterNoon", "Evening", "Sat & Sun"]

    },
    {
        label: "Count",
        name: "Count",
        error: "Count",
        helper: "Count",
        pattern: "/^[0-9]+/",
        required: "Enter the Count",
        message: "",
        placeholder: "Count"
    }

]
const Batch_date = [
    {
        label: "StartDate",
        name: "StartDate",
        error: "StartDate",
        helper: "StartDate",
        pattern: "/^ [A - Za - z] + /",
        required: "Enter the StartDate",
        message: "Please Enter the StartDate",
        placeholder: "StartDate",
        date: "date"

    },
    {
        label: "EndDate",
        name: "EndDate",
        error: "EndDate",
        helper: "EndDate",
        pattern: " /^[A-Za-z]+/",
        required: "Enter the EndDate",
        message: "Please Enter the EndDate",
        placeholder: "EndDate",
        date: "date"

    },
    {
        label: "StartTime",
        name: "StartTime",
        error: "StartTime",
        helper: "StartTime",
        pattern: " /^[A-Za-z]+/",
        required: "Enter the StartTime",
        message: "Please Enter the StartTime",
        placeholder: "StartTime",
        date: "time"

    },
    {
        label: "EndTime",
        name: "EndTime",
        error: "EndTime",
        helper: "EndTime",
        pattern: " /^[A-Za-z]+/",
        required: "Enter the EndTime",
        message: "Please Enter the EndTime",
        placeholder: "EndTime",
        date: "time"

    },
]

export { Batch1, Batch_date }