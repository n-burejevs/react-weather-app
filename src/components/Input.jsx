import React, { useActionState } from "react";

export default function Input(props)
{

//const [state, formAction] = useActionState(getLocation, "");

function getLocation(formData) {
    //"serverless";
   // console.log(formData)
    const location = formData.get("location");
    props.setCity(location)
  }

      React.useEffect(() =>{
    localStorage.setItem('city-weather', JSON.stringify(location));

},[])

    return(
        <div className="form-container">
        <form  className="location-form">
            <input type="text" name="location" className="location-input" 
                    placeholder={props.errorMessage ? props.errorMessage : "City"}
                        id={props.errorMessage ? "error-text" : "regular-text"}   
            />
            <button type="submit" formAction={getLocation} className="submit-btn">Send</button>
        </form>
        </div>
    )
}
/*javascript:throw new Error('A React form was unexpectedly submitted.
 If you called form.submit() manually, consider using form.requestSubmit() instead. 
 If you\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().*/