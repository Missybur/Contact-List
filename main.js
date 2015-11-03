(function(){

  'use strict';

  $(document).ready(init);

  // Initialize data from local storage
  var tasks = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];
  updateList();

  function init() {
    $('#add').click(addTodo);
    $('#list').on('change', 'input', checkboxChanged);
    $('#list').on('click', '.remove', removeTodo);
    // $("#list").on("click", "#edit", editContact );
  }

  function removeTodo(e) {
    var $target = $(e.target);
    var $targetRow = $target.closest('tr');

    var index = $targetRow.index();
    tasks.splice(index, 1);

    updateList();
    saveLocalStorage();
  }


  function checkboxChanged(e) {
    var $target = $(e.target);
    var $targetRow = $target.closest('tr');

    var index = $targetRow.index();
    tasks[index].completed = $target.is(':checked');

    updateList();
    saveLocalStorage();
  }

  function addTodo() {
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var phoneNumber = $("#phoneNumber").val();
    var email = $("#email").val();

    // var task = new Task(description, date);

    var task = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      completed: false
    };

    tasks.push(task);

    updateList();
    saveLocalStorage();
  }

  function updateList() {
    console.log('tasks:', tasks);
    $('#list').empty();

    if(tasks.length){
      $('table.table').show();
    } else {
      $('table.table').hide();
    }

    var taskElements = tasks.map(function(task){
      var $tr = $('#sample').clone();
      $tr.removeAttr('id');
      $tr.children('.firstName').text(task.firstName);
      $tr.children('.lastName').text(task.lastName);
      $tr.children('.phoneNumber').text(task.phoneNumber);
      $tr.children('.email').text(task.email);
      $tr.find('input').prop('checked', task.completed);
      $tr.css({
        'text-decoration': task.completed ? 'line-through' : '',
        'color': task.completed ? '#aaa' : ''
      });
      $tr.show();
      return $tr;
    });

    $('#list').append(taskElements);
  }

})();
