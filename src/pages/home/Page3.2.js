/*
 * @Author: Nokey 
 * @Date: 2017-08-16 15:13:19 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-08-23 21:19:44
 */
// 'use strict';

import { TimelineLite } from 'gsap'

class Page3_2 extends React.Component {
    constructor(props) {
        super(props);
        
        this.TL = null
    }
    
    initAni(){
        console.warn('Start Page3.2 Animation')
        let _me = this
        
        _me.TL = new TimelineLite()

        _me.TL
            .to('.page3.2 .top-box', 0.7, {opacity: 1})
            .to('.page3.2 .btn-1', 0.7, {opacity: 1})
            .to('.page3.2 .btn-2', 0.7, {opacity: 1})
            .to('.page3.2 .bottom-box', 0.3, {opacity: 1})
            .to('.page3.2 .txt-3', 0.7, {opacity: 1})
            .to('.page3.2 .chart', 0.7, {opacity: 1})
            .to('.page3.2 .txt-4', 0.7, {opacity: 1})

            .call(()=>{
                $(window).trigger('scroll-fullpage', 
                    {type: 'SET-ALLOW-SCROLL', payload: {
                        swipe_arrow_show: true,
                        allow_scroll: true
                    }}
                );
            })
    }

    resetAni(){
        console.warn('Clear Page3.2 Animation')
        if(this.TL){
            this.TL.play().seek(0).clear()
            this.TL = null
        }
        // 传值
        let part = this.props.dataSet;
        this.props.handleNum(part);
    }

    componentDidMount() {
        let _me = this

        $(_me.btn1).click(()=>{
            $(_me.txt1).css('opacity', '1')
        })

        $(_me.btn2).click(()=>{
            $(_me.txt2).css('opacity', '1')
        })
        // console.log(this.props.dataSet)
        if(this.props.dataSet.indexOf('_')>=0){
            let a = this.props.dataSet.split('_')[0];
            this.props.add(a)
        }else{
            let c = this.props.dataSet;
            this.props.add(c)
        }
        
    }

    render() {
        return (
            <section className="page3.2 bg-cover component fullpage-slide preload-img" 
                data-id="page3_2">

                <h1>Page3_2</h1>
                
            </section>
        );
    }
}

export default Page3_2;