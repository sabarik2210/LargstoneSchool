const invoice = [

    {
        label: "StudentName",
        name: "StudentName",
        error: "StudentName",
        helper: "StudentName",
        pattern: /^[0-9]+/,
        required: "Enter the StudentName",
        message: "Please Enter the format",
        placeholder: "StudentName",
        line: "multiline",
        select: 'select',
        options: [
            "Karthik",
            "Rohan",
            "Arun",
            "Raja",
            "Anandh",
            "Saravanan",
        ]
    },
    {
        label: "CourseName",
        name: "CourseName",
        error: "CourseName",
        helper: "CourseName",
        pattern: /^[0-9]+/,
        required: "Enter the CourseName",
        message: "Please Enter the format",
        placeholder: "CourseName",
        line: "multiline"
    },
    {
        label: "CourseFees",
        name: "CourseFees",
        error: "CourseFees",
        helper: "CourseFees",
        pattern: /^[0-9]+/,
        required: "Enter the CourseFees",
        message: "Please Enter the format",
        placeholder: "CourseFees",
        line: "multiline"
    },
    {
        label: "BatchName",
        name: "BatchName",
        error: "BatchName",
        helper: "BatchName",
        pattern: /^[0-9]+/,
        required: "Enter the BatchName",
        message: "Please Enter the format",
        placeholder: "BatchName",
        line: "multiline"
    },

    {
        label: "Amount",
        name: "Amount",
        error: "Amount",
        helper: "Amount",
        pattern: /^[0-9]+/,
        required: "Enter the Amount",
        message: "Please Enter the format",
        placeholder: "Amount",
        line: "multiline"

    },
    {
        label: "Discount %",
        name: "Discount",
        error: "Discount",
        helper: "Discount",
        pattern: /^[0-9]{1,2}\%/,
        required: "Enter the Discount",
        message: "Please Enter the format",
        line: "multiline",
        placeholder: "Discount %"

    },
    {
        label: "Total Amount",
        name: "Total Amount",
        error: "Total Amount",
        helper: "Total Amount",
        pattern: /^[0-9]+/,
        required: "Enter the Total Amount",
        message: "Please Enter the Total Amount",
        line: "multiline",
        placeholder: "Total Amount"

    },
    {
        label: "Term",
        name: "Term",
        error: "Term",
        helper: "Term",
        pattern: '',
        required: "select the Term",
        message: "Please Enter the Term",
        placeholder: "Term",
        line: "multiline",
        select: "select",
        options: [
            "I",
            "II",
            "III",
        ]
    },
    {
        label: "payment Method",
        name: "payment Method",
        error: "payment Method",
        helper: "payment Method",
        pattern: /^[A-Za-z]+/,
        line: "multiline",
        required: "Enter the payment Method",
        message: "Please Enter the payment Method",
        placeholder: "Payment Method"

    },
]


export { invoice }