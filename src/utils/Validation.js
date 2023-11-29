import { useState, useCallback } from "react";


function Validation() {
    const [errors, setErrors] = useState({});
    const [formsValue, setFormsValue] = useState({});
    const [isValid, setIsValid] = useState(false);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;



        console.log(name, 'afsaf')

        setFormsValue({
            ...formsValue,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: target.validationMessage,
        });

        setIsValid(target.closest('form').checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setFormsValue(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setFormsValue, setErrors, setIsValid]
    );

    return { handleChange, errors, formsValue, setFormsValue, setErrors, setIsValid, isValid, resetForm }
}

export default Validation;

