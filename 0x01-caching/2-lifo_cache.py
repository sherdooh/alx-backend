#!/usr/bin/python3
"""Creating LIFOCache class inheriting from BaseCaching"""
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """ Define LIFOCache """

    def __init__(self):
        """ Initialize LIFOCache """
        self.stack = []
        super().__init__()

    def put(self, key, item):
        """ Assigning item to the dictionary """
        if key and item:
            if self.cache_data.get(key):
                self.stack.remove(key)
            while len(self.stack) >= self.MAX_ITEMS:
                delete = self.stack.pop()
                self.cache_data.pop(delete)
                print('DISCARD: {}'.format(delete))
            self.stack.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """ Return value associated with the given key """
        return self.cache_data.get(key)
