// import styles from './picss.styl';

require('./picss.styl')

class ProcessIndicator extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rangeValue: 1,
            num1:(Math.PI*2*40)+' '+Math.PI*2*40*(1-1/3),
        }
    }
    componentDidUpdate(){
        console.log(this.props)
        let hh = this.props.currentPart;//当前部分
        let total = this.props.obj[hh];//当前部分一共有多少页
        let obj= this.props.obj;//把这几部分拿过来
        let num = 0;
        for(let attr in obj){
            num++;
        }
        console.log(num);
        let range = this.refs.range, 
                circle = this.refs.circle;
        let percent = (this.props.currentPage) / total, perimeter = Math.PI * 2 * 40;
        // console.log(this.props.currentPage,total)
        // console.log("当前部分是"+hh+","+"一共有"+num+"部分")
        // console.log('flag是'+this.props.flag)
        
        if(!this.props.flag){
            //没有分页
            $('.piText-before').css('color','#399539')
            $('#circle').css('stroke','#399539');
            
                // $('#circle').css('transition','0.8s');
                // $('#circle').css('stroke-dasharray',this.state.num1);
           
                TweenLite.to('#circle',0.5,{css:{strokeDasharray:this.state.num1}});
            
        }else{
            if(perimeter * percent<(Math.PI*2*40)){
                $('.piText-before').css('color','white');
                $('.piText-middle').css('color','white')
                $('.piText-after').css('color','white')
                //重新定义一下
                $('#circle').css('stroke','white');
            }else{
                $('.piText-before').css('color','#399539')
                $('#circle').css('stroke','#399539');
                if(hh==num){
                    $('.piText-middle').css('color','#399539')
                    $('.piText-after').css('color','#399539')
                }
            }
            
                // $('#circle').css('transition','0.8s');
                // $('#circle').css('stroke-dasharray',perimeter * percent + " " + perimeter * (1 - percent));
                TweenLite.to('#circle',0.5,{css:{strokeDasharray:perimeter * percent + " " + perimeter * (1 - percent)}});

            
            
        }
    }
    
    render(){
        let {rangeValue,num1} = this.state;
        let {currentPart,dir} = this.props;
        // console.log(currentPart)
        return (
            <div className="proIndicator">
                <div className="proIndicator-box">
                    <div className="svgContainer">
                        <svg width="100" height="100" viewBox="0 0 100 100" className='pi-svg'>
                            <circle cx="50" cy="50" r="46" strokeWidth='2'  stroke="white" fill="none"></circle>
                            <circle cx="50" cy="50" r="40" strokeWidth='6'  stroke="tranparent" fill="none"></circle>
                            <circle cx="50" cy="50" r="40" strokeWidth='6' stroke="#399539" fill="none"  ref='circle' id='circle' strokeDasharray={num1}></circle>
                        </svg>
                    </div>
                    
                    <div className="piText">
                        <div className="piText-box">
                            <span className="piText-before" ref={ref=>this.span1=ref}>{currentPart}</span>
                            <i className="piText-middle" ref={ref=>this.i=ref}>/</i>
                            <span className="piText-after" ref={ref=>this.span2=ref}>3</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProcessIndicator;