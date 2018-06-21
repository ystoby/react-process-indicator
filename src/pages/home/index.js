/*
 * @Author: Nokey 
 * @Date: 2017-07-13 18:03:17 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-10-24 14:42:32
 */
// 'use strict';

// Plugins
import 'fullpage.js'

// Utils
import { TimelineLite} from 'gsap'
import Util from 'utils'

// Style
import '../../fonts/roboto-thin.styl'
import styles from './css.styl'

// Pages
import Page1_1 from './Page1'
import Page1_2 from './Page1.2'
import Page1_3 from './Page1.3'
import Page1_4 from './Page1.4'
import Page2 from './Page2'
// import Page3 from './Page3'
import Page3_1 from './Page3.1'
import Page3_2 from './Page3.2'
import Page3_3 from './Page3.3'

//processIndicator
import ProcessIndicator from './ProcessIndicator'


class MyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Loading
            loading: true,
            currentPart : 1,
            dir:'down',
            handleNum:1,
            flag:1,
            currentPage:1,
            arr:[],
            obj:{}

        }
        
        this.TL = null

        this._app = null
        this.fullpage_sections = null
    }
    
    componentDidMount() {
        console.log('%c' + 'CGTN', 'font-family: "courier new"; color:#000; font-size:24px; font-weight:bold; text-shadow:0 0 6px #22ff22;');

        let _me = this
        // console.log(_me);
        _me.TL = new TimelineLite()

        _me.TL
            .to('.home img', 0.5, {scale: 0.5, opacity: 0})
            .to('.home img', 0.5, {scale: 1, opacity: 1})

        /**
         * Config
         */
        _me._app = $('#app')
        _me.fullpage_sections = $('.fullpage-slide');

        /**
         * Register global eventlistener
         */
        $(window).on('GLOBAL-ACT', (e, action)=>{
            /**
             * Usage:
             * action:{
             *     type: 'TYPE',
             *     payload: {}
             * }
             */
            switch (action.type) {
                case 'SWIPE':
                    _me.setState({
                        swipe_show: action.payload.show,
                        swipe_color: action.payload.color
                    })
                    break;

                case 'START-PAGE1-ANIMATE':
                    _me.page1.initAni()
                    break;

                case 'LOADING':
                    _me.setState({
                        loading: action.payload.loading
                    })
                    break;

                case 'SET-ALLOW-SCROLL':
                    _me.setState({
                        swipe_show: action.payload.swipe_arrow_show
                    })
                    $.fn.fullpage.setAllowScrolling(action.payload.allow_scroll)
                    break;
            
                default:
                    console.warn('No implementation for this action!')
                    break;
            }
        })

        /**
         * Init fullpage
         * 
         * Fragment code:
         * $.fn.fullpage.setAllowScrolling(false)
         */
        $('#fullpage').fullpage({
            sectionSelector: '.fullpage-slide',
            normalScrollElements: '.fp-normal-scroll',
            touchSensitivity: 15,
            scrollingSpeed: Util.isIE() ? 1300 : 800,
            scrollHorizontally: true,
            //（默认true）定义水平滑块是否在到达上一张或上一张幻灯片后循环
            loopHorizontal: false,
            //controlArrows：（默认true）确定是否将幻灯片的控制箭头向右或向左移动。
            controlArrows: false,
            //update--给多个页面填充不同的背景颜色
            sectionsColor:['red','orange','black','skyblue','pink','#f08080','#9BCD9B','#9F79EE'],
            // Events
            //index从1开始
            afterLoad: (anchorLink, index)=>{
                // $(window).trigger('scroll-fullpage', 
                //     {type: 'SWIPE', payload: {
                //         show: true,
                //         color: 'red'
                //     }}
                // );
                // console.log(this)
                let current_page = _me.fullpage_sections.eq(index - 1)

                // Start every page animation
                !this.state.loading && _me[current_page.data('id')].initAni()

            },
            onLeave: (index, nextIndex, dir)=>{
                console.log('Leave', index, nextIndex, dir)
                //改currenPage,和dir
                // this.setState({
                //     currentPage : nextIndex,
                //     dir
                // })
                let next_page = _me.fullpage_sections.eq(nextIndex-1);

                // Clear page animation
                _me[next_page.data('id')].resetAni()
            },
            afterRender: ()=>{
                // DOM is ready
                console.log('fp render')

            }
        });


        /*以下主要是统计各个部分有多少页面 */
        //填充arr,最终的arr
        // console.log(this.state.arr)
        //["1", "1", "2", "3", "3", "3"]
        let obj = {};
        let arr2 = this.state.arr;
        arr2.forEach((e,i)=>{
            if(!obj[e]){
                obj[e]=1
            }else{
                obj[e] += 1
            }
        })
        this.setState({
            obj
        })
        // console.log(obj);//{1: 2, 2: 1, 3: 3}

    }
    add(n){
        this.state.arr.push(n);
    }
    handleNum(a){
        //a就是具体的那一页
        console.log(a)
        if(a.indexOf('_')>=0){
            let part = a.split('_')[0];
            let page = a.split('_')[1];
            console.log('该部分有分页',page)
            this.setState({
                currentPart:part,
                currentPage:page,
                flag:1
            })
            // console.log(this.state.flag)
        }else{

            console.log('该部分只此一页，没有其他分页')
            this.setState({
                currentPart:a,
                currentPage:1,
                flag:0
            })
        }
    }
    render() {
        let {currentPart,dir,currentPage,flag,obj} = this.state;
        // alert(1)
        
        return (
            <section className={styles.home}>
                {/* Full Page */}
                <div id="fullpage">
                    {/* Story 1 */
                        /*
                         _this就是Page1这个组件
                        this就是MyComponent这个组件
                        */
                    }
                    
                    <Page1_1 ref={_this => this.page1_1 = _this} dataSet='1_1' handleNum={this.handleNum.bind(this)} add={this.add.bind(this)}/>
                    <Page1_2 ref={_this => this.page1_2 = _this} dataSet='1_2' handleNum={this.handleNum.bind(this)} add={this.add.bind(this)}/>
                    <Page1_3 ref={_this => this.page1_3 = _this} dataSet='1_3' handleNum={this.handleNum.bind(this)} add={this.add.bind(this)}/>
                    <Page1_4 ref={_this => this.page1_4 = _this} dataSet='1_4' handleNum={this.handleNum.bind(this)} add={this.add.bind(this)}/>
                    <Page2 ref={_this => this.page2 = _this} dataSet='2' handleNum={this.handleNum.bind(this)} add={this.add.bind(this)}/>

                    {/* <Page3 ref={_this => this.page3 = _this} /> */}
                    <Page3_1 ref={_this => this.page3_1 = _this} dataSet='3_1' handleNum={this.handleNum.bind(this)} add={this.add.bind(this)}/>
                    <Page3_2 ref={_this => this.page3_2 = _this} dataSet='3_2' handleNum={this.handleNum.bind(this)} add={this.add.bind(this)}/>
                    <Page3_3 ref={_this => this.page3_3 = _this} dataSet='3_3' handleNum={this.handleNum.bind(this)} add={this.add.bind(this)}/>
                </div>

                {/*以下是圆环进度条*/}
                <ProcessIndicator {...{
                    currentPart,
                    currentPage,
                    dir,
                    flag,
                    obj
                }}/>
                
                
            </section>
        );
    }
}

ReactDOM.render(<MyComponent /> , document.getElementById('app'));
export default ProcessIndicator;