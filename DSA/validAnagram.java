import java.util.*;

class validAnagram {

    public boolean validAnagram(String s1, String s2) {
        //BRUTE FORCE APPROACH
        // int[] arr = new int[26];
        // if (s1.length() != s2.length()) return false;

        // for (int i = 0; i < s1.length(); i++) {
        //     char ch = s1.charAt(i);
        //     arr[ch - 'a']++;
        // }
        // for (int i = 0; i < s2.length(); i++) {
        //     char ch = s2.charAt(i);
        //     arr[ch - 'a']--;
        // }
        // for (int count : arr) {
        //     if (count != 0) return false;
        // }
        // return true;
        //
        // HASHING APPROACH
        HashMap<Character, Integer> map = new HashMap<>();
        for (char ch : s1.toCharArray()) {
            map.put(ch, map.getOrDefault(ch, 0) + 1);
        }
        for (char ch : s2.toCharArray()) {
            if (!map.containsKey(ch)) {
                return false;
            } else {
                map.put(ch, map.get(ch) - 1);
                if (map.get(ch) == 0) {
                    map.remove(ch);
                }
            }
        }
        return map.isEmpty();
    }

    public static void main(String[] args) {
        String s1 = "finaaz";
        String s2 = "faizan";

        validAnagram obj = new validAnagram();
        if (obj.validAnagram(s1, s2)) {
            System.out.println("Anagram");
        } else {
            System.out.println("Not Anagram");
        }
    }
}
