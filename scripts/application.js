'use strict';

$(function () {

  window.state = {};

  window.state.hashTable = new HashTable();

  rivets.bind($('#hashTable'), { state: window.state });

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  $('.store').click(function () {
    let $key = $('.key');
    let $value = $('.value');
    let $output = $('.output');

    if (!$key.val() || !$value.val()) {
      $output.text('Please enter both a key and a value to store in the hashTable');
      return;
    }

    let key = escapeHtml($key.val());
    let value = escapeHtml($value.val());
    let outputStr = `The hash table stored key, value pair key: ${key} and value: ${value}`;
    window.state.hashTable.insert(key, value);
    $output.text(outputStr);
    $key.val('');
    $value.val('');
  });

  $('.retrieve').click(function () {
    let $key = $('.key-retrieve');
    let $output = $('.output');

    if (!$key.val()) {
      $output.text('Please enter both a key to retrieve a value from the hashTable');
      return;
    }

    let key = escapeHtml($key.val());
    let value = window.state.hashTable.retrieve(key);
    let outputStr = `The hash table retrieved value: ${value} stored at key: ${key}`;
    $output.text(outputStr);
    $key.val('');
  });
});
