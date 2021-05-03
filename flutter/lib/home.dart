import 'dart:async';

import 'package:flutter/material.dart';
import 'package:todo/model/item.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key key, this.title}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();

  final String title;
}

class _HomeScreenState extends State<HomeScreen> {
  var list = [
    Item(name: 'Fazer compras', value: false),
    Item(name: 'Limpar banheiro', value: false),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: ListView.builder(
          itemCount: list.length,
          itemBuilder: (ctx, index) {
            return _buildItemToDo(list[index]);
          }),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          _showDialog(context);
        },
        tooltip: 'Add',
        child: Icon(Icons.add),
      ),
    );
  }

  void _add(String text) {
    setState(() {
      list.add(Item(name: text, value: false));
    });
  }

  void check(bool value, Item item) {
    setState(() {
      item.value = value;
      Timer(Duration(milliseconds: 500), () {
        delete(item);
      });
    });
  }

  void delete(Item item) {
    setState(() {
      list.remove(item);
    });
  }

  _buildItemToDo(Item item) {
    return Padding(
      padding: EdgeInsets.all(10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(item.name),
          Checkbox(
              value: item.value,
              onChanged: (val) {
                check(val, item);
              })
        ],
      ),
    );
  }

  _showDialog(BuildContext context) {
    var controller = TextEditingController();
    showDialog(
        context: context,
        child: SimpleDialog(
          contentPadding: EdgeInsets.all(10),
          children: [
            TextFormField(
              controller: controller,
              decoration: InputDecoration(
                labelText: 'Nome da Tarefa',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(2.0),
                  borderSide: BorderSide(color: Colors.blue),
                ),
                //fillColor: Colors.green
              ),
            ),
            SizedBox(
              height: 10,
            ),
            FlatButton(
                color: Colors.blue,
                onPressed: () {
                  _add(controller.text);
                  Navigator.of(context).pop();
                },
                child: Text(
                  'Adicionar',
                  style: TextStyle(color: Colors.white),
                ))
          ],
        ));
  }
}
