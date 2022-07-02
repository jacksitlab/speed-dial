import { throws } from 'assert';
import * as React from 'react'

interface IToggleButtonProps{
    tooltip?:string;
    onCheckChanged(checked: boolean):void;

}
interface IToggleButtonState{
    checked:boolean;

}
class ToggleButton extends React.Component<IToggleButtonProps, IToggleButtonState>{

    public constructor(props:IToggleButtonProps){
        super(props);
        this.state={checked:false}
    }

    private onCheckChanged(checked:boolean){
        this.setState({checked:checked})
        this.props.onCheckChanged(checked);
    }


    render(){
        return <div className="tooltip" style={{display:'inline-block'}}>
            <label className="switch">
                    <input type="checkbox" title="" checked={this.state.checked} onChange={(e)=>{this.onCheckChanged(e.target.checked)}} />
                    <span className="slider round"></span>
                </label>
                
                {this.props.tooltip?<span className="tooltiptext">{this.props.tooltip}</span>:''}

            </div>
    }
}

export default ToggleButton