

import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  Text,
  View,
  InteractionManager,
  Image
} from 'react-native';

// 跑马灯效果视图(竖直方向，无限循环)
export default class HorseRaceLamp extends Component {

  static propTypes = {
    dataArr: PropTypes.array.isRequired,  // 数据源
    maxShowNum: PropTypes.number.isRequired,  // 最多显示行数
    rowHeight: PropTypes.number.isRequired, // 行高
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),  // 容器视图样式
    //renderRow // 绘制每行的回调方法
  }

  constructor(props) {
    super(props);
    this.state = {
      viewHigher: this.props.dataArr.length <= this.props.maxShowNum,  //视图是否更宽
      scrollOffsetY: 0, //滚动视图的偏移量
    };
  }

  componentDidMount() {
    this._startMovingAnimate();
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  _startMovingAnimate() {
    this.timer && clearInterval(this.timer);
    
    const maxScrollY = this.props.rowHeight * this.props.dataArr.length;
    console.log('MarqueeText start movingAnimation maxScrollY==',maxScrollY);

    this.timer = setInterval(
      () => {
        let scrollOffsetY = this.state.scrollOffsetY;
        // console.log('this.scrollY:'+this.scrollY);        
        if (scrollOffsetY < maxScrollY) {
          scrollOffsetY += this.props.rowHeight;
        } else {
          // 当已经滚动到了maxScrollY时，悄悄的将滚动视图的位置切换到初始位置
          scrollOffsetY = 0;
          this.refs.scrollView.scrollTo({
            x:0,
            y:scrollOffsetY,
            animated: false,
          });

          scrollOffsetY += this.props.rowHeight;            
        }

        this.setState({
          scrollOffsetY: scrollOffsetY
        });

        if (this.refs.scrollView) {
          this.refs.scrollView.scrollTo({
            x:0,
            y:scrollOffsetY,
            animated: true,
          });
        } else {
          this.timer && clearInterval(this.timer);
        }
      },
      3000,   //计时器时间过短，比如几十毫秒，性能稍差的安卓机受不了
    );
  }

  //isRepeat: 是否为再次绘制
  _renderViewArr(isRepeat) {
    let localDataArr = isRepeat ? this.props.dataArr.slice(0,this.props.maxShowNum) : this.props.dataArr;
    
    let viewArr = localDataArr.map((item, index) => {
      // 透明度
      let opacity = 1;
      if (!this.state.viewHigher) {
        // 渐变系数，越大渐变的越快
        let ratio = 0.6 / (this.props.rowHeight * (this.props.maxShowNum - 1));
        opacity = 1 - ((this.state.scrollOffsetY + (this.props.dataArr.length - 1 + this.props.maxShowNum) * this.props.rowHeight - index * this.props.rowHeight) % (this.props.rowHeight * this.props.dataArr.length)) * ratio;
      }
      return this.props.renderRow(item, index, opacity);
    });
    return viewArr;
  }

  render() {
    return (
      this.state.viewHigher ?
        <View style={this.props.style}>
          {this._renderViewArr()}
        </View>
      :
        <View
          style={this.props.style}
        >
          <ScrollView
            ref={'scrollView'}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            canCancelContentTouches={false}
            scrollEnabled={false}
            style={{height: this.props.rowHeight * this.props.maxShowNum}}
          >
            {this._renderViewArr()}
            {this._renderViewArr(true)}
          </ScrollView>
        </View>
    );
  }
}
