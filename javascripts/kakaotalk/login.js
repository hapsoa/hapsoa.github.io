// alert();

var $email = $('#email');
var $password = $('#password');
var $login = $('#login');

$login.on('click', function() {
        var emailMessage = $email.val();
        var passwordMessage = $password.val();

        if (emailMessage.length === 0)
            alert('이메일을 입력하세요');
        else if (passwordMessage.length < 9)
            alert('비밀번호 9자 이상 입력하세요');
        else
            window.location = '/kakaotalk/friends';
    }
);