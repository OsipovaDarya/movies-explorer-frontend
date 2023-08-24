import { useState } from "react";

function Validation() {
    const [errors, setErrors] = useState({});
    const [formsValue, setFormsValue] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormsValue({
            ...formsValue,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: e.target.validationMessage,
        });

        setIsValid(e.target.closest('form').checkValidity());
    };

    return { handleChange, errors, formsValue, setFormsValue, setErrors, setIsValid }
}

export default Validation;