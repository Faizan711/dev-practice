import java.util.*;

public class linkedList {

    Node head;

    static class Node {

        int data;
        Node next;

        Node(int d) {
            data = d;
            next = null;
        }
    }

    public static linkedList insert(linkedList list, int data) {
        Node new_node = new Node(data);
        if (list.head == null) {
            list.head = new_node;
        } else {
            Node last = list.head;
            while (last.next != null) {
                last = last.next;
            }
            last.next = new_node;
        }
        return list;
    }

    public void printList() {
        Node currNode = head;
        while (currNode != null) {
            System.out.print(currNode.data + " ");
            currNode = currNode.next;
        }
    }
}

class main {

    public static void main(String[] args) {
        linkedList list = new linkedList();
        list = list.insert(list, 12);
        list = list.insert(list, 37);
        list = list.insert(list, 98);

        list.printList();
    }
}
