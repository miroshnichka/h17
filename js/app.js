var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function() {
        return{
            visible: false
        };
    },
    detailsClick: function(e) {
        e.preventDefault();
        this.setState({visible: true});
    },
    render: function(){
        var author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;
        return (
            <div className='article'>
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href = '#' onClick = {this.detailsClick} className = {'news__readmore ' + (visible ? 'none': '')}> details </a>
                <p className={"news__bigText "+ (visible ? '': 'none')}>{bigText}</p>
            </div>
            )
    }
});

var News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    render: function() {
        var data = this.props.data;
        var newsTemplate;

        if(data.length >0 ) {
            newsTemplate = data.map(function(item, index) {
            return (
                <div key={index}>
                    <Article data={item} />
                </div>
                )
        })
        }
        else {
            newsTemplate = <p>No news</p>
            };

        return (
                <div className="news">
                {newsTemplate}
                <strong className={data.length > 0 ? '': 'none'}> All news number: {data.length}</strong>
                </div>
                );
    }
});

var TestInput = React.createClass({
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.myTestInput).focus();
    },
    onBtnClickHandler: function() {
        alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
    },
    render: function() {
        return (
            <div>
            <input 
            className='test-input' 
            defaultValue='' 
            placeholder="Type value"
            ref = "myTestInput" />
            </div>
        );
    }
});

var Add = React.createClass({
    getInitialState: function() { 
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true,
            data: this.props.data
        }
    },
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onBtnClickHandler: function(e) {
        e.preventDefault();
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = ReactDOM.findDOMNode(this.refs.text).value;
        var obj={};
        obj.author=author;
        obj.text=text;
        var newArray = this.props.data.push(obj);
        this.setState({data:newArray});
        ReactDOM.findDOMNode(this.refs.author).value = '';
        ReactDOM.findDOMNode(this.refs.text).value = '';
    },
     onCheckRuleClick: function(e) {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked}); 
    },
    onAuthorChange: function(e) {
        if (e.target.value.trim().length > 0) {
            this.setState({authorIsEmpty: false})
        } else {
            this.setState({authorIsEmpty: true})
        }
    },
    onTextChange: function(e) {
        if (e.target.value.trim().length > 0) {
            this.setState({textIsEmpty: false})
        } else {
            this.setState({textIsEmpty: true})
        }
    },
   
    render: function() {
        var agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty;

        return (
            <div>
            <form className='add cf'>
            <input
                type='text'
                className='add__author'
                onChange={this.onAuthorChange}
                placeholder='Ваше имя'
                ref='author'
            />
            <textarea
                className='add__text'
                onChange={this.onTextChange}
                placeholder='Текст новости'
                ref='text'>
            </textarea>
            <label className='add__checkrule'>
            <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick} />
            Cогласен с правилами
            </label>
            <button
                className='add__btn'
                onClick={this.onBtnClickHandler}
                ref='alert_button'
                disabled={ agreeNotChecked || authorIsEmpty || textIsEmpty}
            >
            Add news item
            </button>
            </form>
            <News data={my_news} />
            </div>
        );
    }
});



var App = React.createClass({
    render: function() {
        return (
            <div className="app">
            <h3>News</h3>
            <Add data={my_news}/>
            </div>
        );
    }   
});

ReactDOM.render(
<App />,
document.getElementById('root')
);