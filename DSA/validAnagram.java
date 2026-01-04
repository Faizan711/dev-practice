import java.util.*;

class validAnagram {

    public boolean validAnagram(String s1, String s2) {
        int[] arr = new int[26];
        if (s1.length() != s2.length()) return false;

        for (int i = 0; i < s1.length(); i++) {
            char ch = s1.charAt(i);
            arr[ch - 'a']++;
        }
        for (int i = 0; i < s2.length(); i++) {
            char ch = s2.charAt(i);
            arr[ch - 'a']--;
        }
        for (int count : arr) {
            if (count != 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        String s1 = "finazz";
        String s2 = "faizan";

        validAnagram obj = new validAnagram();
        if (obj.validAnagram(s1, s2)) {
            System.out.println("Anagram");
        } else {
            System.out.println("Not Anagram");
        }
    }
}
