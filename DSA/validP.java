import java.util.*;

class validP {

    public boolean validP(String s) {
        Stack<Character> st = new Stack<>();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '{' || ch == '(' || ch == '[') {
                st.push(ch);
            } else {
                if (ch == '}') {
                    if (st.isEmpty() || st.peek() != '{') {
                        return false;
                    } else {
                        st.pop();
                    }
                } else if (ch == ')') {
                    if (st.isEmpty() || st.peek() != '(') {
                        return false;
                    } else {
                        st.pop();
                    }
                } else if (ch == ']') {
                    if (st.isEmpty() || st.peek() != '[') {
                        return false;
                    } else {
                        st.pop();
                    }
                } else {
                    return false;
                }
            }
        }
        return st.isEmpty();
    }

    public static void main(String[] args) {
        String s = "{[(]}";
        validP v = new validP();
        if (v.validP(s)) {
            System.out.println("{[()]} is a Valid String");
        } else {
            System.out.println("{[(]} is not a valid String");
        }
    }
}
